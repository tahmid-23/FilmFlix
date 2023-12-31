import express, { Request } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { PoolConnection, createPool } from 'mariadb';
import cors from 'cors';
import { UserInfoClient } from 'auth0';

const app = express();

app.use(cors());

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: 'filmflix',
  password: process.env.DB_PASSWORD
});

app.use(
  auth({
    audience: 'HackUMBC',
    issuerBaseURL: 'https://dev-1grxamuresxko6xk.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  })
);

const auth0 = new UserInfoClient({
  domain: 'dev-1grxamuresxko6xk.us.auth0.com'
});

async function getAccountIdOrCreate(
  connection: PoolConnection,
  token: string,
  sub: string
) {
  const rows = await connection.query(
    'SELECT account_id FROM account WHERE account_sub = ?',
    [sub]
  );
  if (rows.length !== 0) {
    return rows[0].account_id;
  }

  const response = await auth0.getUserInfo(token);
  const name = response.data.name;
  const email = response.data.email;

  await connection.query(
    'INSERT INTO account (account_sub, name, email, bio) VALUES (?, ?, ?, ?)',
    [sub, name, email, `Member since ${new Date().getFullYear()}`]
  );
  const newRows = await connection.query(
    'SELECT account_id FROM account WHERE account_sub = ?',
    [sub]
  );
  return newRows[0].account_id;
}

app.get('/api/id', async (req, res) => {
  const token = req.auth?.token;
  const sub = req.auth?.payload.sub;
  if (!token || !sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();

  try {
    const accountId = await getAccountIdOrCreate(connection, token, sub);
    res.json(accountId);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

app.get('/api/user/:id', async (req: Request<{ id: number }>, res) => {
  const connection = await pool.getConnection();

  try {
    const accounts = await connection.query(
      'SELECT name, email, bio FROM account WHERE account_id = ?',
      [req.params.id]
    );

    if (accounts.length === 0) {
      res.sendStatus(404);
      return;
    }

    const account = accounts[0];

    const reviews = (
      await connection.query(
        'SELECT review_id, movie_title, rating, description, timestamp FROM review WHERE account_id = ? ORDER BY timestamp DESC',
        [req.params.id]
      )
    ).map((review: any) => {
      return { ...review, timestamp: review.timestamp.toString() };
    });

    const watchList = (
      await connection.query(
        'SELECT planned_movie_id, movie_title, watch_at, timestamp FROM planned_movie WHERE account_id = ? ORDER BY timestamp DESC',
        [req.params.id]
      )
    ).map((movie: any) => {
      return {
        ...movie,
        watch_at: movie.watch_at.toString(),
        timestamp: movie.timestamp.toString()
      };
    });

    res.json({
      name: account.name,
      email: account.email,
      bio: account.bio,
      reviews: reviews,
      watchList: watchList
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

app.get('/api/friends', async (req, res) => {
  const token = req.auth?.token;
  const sub = req.auth?.payload.sub;
  if (!token || !sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = await getAccountIdOrCreate(connection, token, sub);
    const rows = await connection.query(
      'SELECT account_id, name FROM account INNER JOIN friend ON friend.second_friend_id = account.account_id AND friend.first_friend_id = ?',
      [accountId]
    );

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

app.get('/api/feed', async (req, res) => {
  const token = req.auth?.token;
  const sub = req.auth?.payload?.sub;
  if (!token || !sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = await getAccountIdOrCreate(connection, token, sub);
    const rows = await connection.query(
      'SELECT account_id, name FROM account INNER JOIN friend ON friend.second_friend_id = account.account_id AND friend.first_friend_id = ?',
      [accountId]
    );

    const result = [];
    for (const row of rows) {
      const reviews = (
        await connection.query(
          'SELECT review_id, movie_title, rating, description, timestamp FROM review WHERE account_id = ?',
          [row.account_id]
        )
      ).map((review: any) => {
        return { ...review, timestamp: review.timestamp.toString() };
      });
      const watchList = (
        await connection.query(
          'SELECT planned_movie_id, movie_title, watch_at, timestamp FROM planned_movie WHERE account_id = ?',
          [row.account_id]
        )
      ).map((movie: any) => {
        return {
          ...movie,
          watch_at: movie.watch_at.toString(),
          timestamp: movie.timestamp.toString()
        };
      });
      result.push({
        name: row.name,
        reviews: reviews,
        watchList: watchList
      });
    }

    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

interface RequestWithBody<T> extends Request {
  body: T;
}

app.use(express.json());

interface FriendBody {
  email: string;
}

app.post('/api/add-friend', async (req: RequestWithBody<FriendBody>, res) => {
  const token = req.auth?.token;
  const sub = req.auth?.payload?.sub;
  if (!token || !sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const senderId = await getAccountIdOrCreate(connection, token, sub);
    const targets = await connection.query(
      'SELECT account_id FROM account WHERE email = ?',
      [req.body.email]
    );
    if (targets.length === 0) {
      res.status(404);
      return;
    }
    const targetId = targets[0].account_id;

    await connection.execute(
      'INSERT INTO friend (first_friend_id, second_friend_id) VALUES (?, ?), (?, ?)',
      [senderId, targetId, targetId, senderId]
    );

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

interface BioBody {
  bio: string;
}

app.post('/api/bio', async (req: RequestWithBody<BioBody>, res) => {
  const token = req.auth?.token;
  const sub = req.auth?.payload?.sub;
  if (!token || !sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = await getAccountIdOrCreate(connection, token, sub);
    await connection.execute(
      'UPDATE account SET bio = ? WHERE account_id = ?',
      [req.body.bio, accountId]
    );

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

interface AddMovieBody {
  movieTitle: string;
  rating: number;
  description: string;
}

app.post('/api/add-review', async (req: RequestWithBody<AddMovieBody>, res) => {
  const token = req.auth?.token;
  const sub = req.auth?.payload?.sub;
  if (!token || !sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = await getAccountIdOrCreate(connection, token, sub);
    await connection.execute(
      `INSERT INTO review (account_id, movie_title, rating, description, timestamp) VALUES (?, ?, ?, ?, ?)`,
      [
        accountId,
        req.body.movieTitle,
        req.body.rating,
        req.body.description,
        Math.round(Date.now() / 1000)
      ]
    );

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

interface AddWatchListBody {
  movieTitle: string;
  watchAt: number;
}

app.post(
  '/api/add-watch-list',
  async (req: RequestWithBody<AddWatchListBody>, res) => {
    const token = req.auth?.token;
    const sub = req.auth?.payload?.sub;
    if (!token || !sub) {
      res.sendStatus(500);
      return;
    }

    const connection = await pool.getConnection();
    try {
      const accountId = await getAccountIdOrCreate(connection, token, sub);
      await connection.execute(
        `INSERT INTO planned_movie (account_id, movie_title, watch_at, timestamp) VALUES (?, ?, ?, ?)`,
        [
          accountId,
          req.body.movieTitle,
          req.body.watchAt,
          Math.round(Date.now() / 1000)
        ]
      );

      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    } finally {
      connection.end();
    }
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

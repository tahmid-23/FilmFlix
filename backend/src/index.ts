import express, { Request } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { PoolConnection, createPool } from 'mariadb';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

const pool = createPool({
  host: 'localhost',
  user: 'hackumbc',
  database: 'hackumbc',
  password: 'hackumbc'
});

app.use(
  auth({
    audience: 'HackUMBC',
    issuerBaseURL: 'https://dev-1grxamuresxko6xk.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  })
);

async function getAccountIdOrCreate(connection: PoolConnection, sub: string) {
  const rows = await connection.query(
    'SELECT account_id FROM account WHERE account_sub = ?',
    [sub]
  );
  if (rows.length !== 0) {
    return rows[0];
  }

  await connection.query(
    "INSERT INTO account (account_sub, name, bio, recent_review_id, recent_review_time, recent_registration_id, recent_registration_time) VALUES (?, 'John Doe', '', null, null, null, null)"
  );
  const newRows = await connection.query(
    'SELECT account_id FROM account WHERE account_sub = ?',
    [sub]
  );
  return newRows[0];
}

app.get('/api/user/:id', async (req: Request<{ id: number }>, res) => {
  const connection = await pool.getConnection();
  try {
    const accounts = await connection.query(
      'SELECT name, bio FROM account WHERE account_id = ?',
      [req.params.id]
    );

    if (accounts.length === 0) {
      res.sendStatus(404);
      return;
    }

    const account = accounts[0];

    const reviews = (
      await connection.query(
        'SELECT review_id, movie_title, rating, description, timestamp FROM review WHERE account_id = ?',
        [req.params.id]
      )
    ).map((review: any) => {
      return { ...review, timestamp: review.timestamp.toString() };
    });

    const watchList = (
      await connection.query(
        'SELECT planned_movie_id, movie_title, timestamp FROM planned_movie WHERE account_id = ?',
        [req.params.id]
      )
    ).map((movie: any) => {
      return {
        ...movie,
        timestamp: movie.timestamp.toString()
      };
    });

    res.json({
      name: account.name,
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
  const sub = req.auth?.payload?.sub;
  if (!sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = getAccountIdOrCreate(connection, sub);
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
  const sub = req.auth?.payload?.sub;
  if (!sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = getAccountIdOrCreate(connection, sub);
    const rows = await connection.query(
      'SELECT account_id, name FROM account INNER JOIN friend ON friend.second_friend_id = account.account_id AND friend.first_friend_id = ?',
      [accountId]
    );

    const result = [];
    for (const row of rows) {
      const reviews = await connection.query(
        'SELECT review_id, movie_title, rating, description, timestamp FROM review WHERE account_id = ?',
        [row.account_id]
      );
      const watchList = await connection.query(
        'SELECT planned_movie_id, movie_title, timestamp FROM planned_movie WHERE account_id = ?',
        [row.account_id]
      );
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

interface BioBody {
  bio: string;
}

app.post('/api/bio', async (req: RequestWithBody<BioBody>, res) => {
  const sub = req.auth?.payload?.sub;
  if (!sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = getAccountIdOrCreate(connection, sub);
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
  const sub = req.auth?.payload?.sub;
  if (!sub) {
    res.sendStatus(500);
    return;
  }

  const connection = await pool.getConnection();
  try {
    const accountId = getAccountIdOrCreate(connection, sub);
    await connection.execute(
      `INSERT INTO review (account_id, movie_title, rating, description, timestamp) VALUES (?, ?, ?, ?, ?)`,
      [
        accountId,
        req.body.movieTitle,
        req.body.rating,
        req.body.description,
        Date.now()
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
    const sub = req.auth?.payload?.sub;
    if (!sub) {
      res.sendStatus(500);
      return;
    }

    const connection = await pool.getConnection();
    try {
      const accountId = getAccountIdOrCreate(connection, sub);
      await connection.execute(
        `INSERT INTO planned_movie (account_id, movie_title, watch_at, timestamp) VALUES (?, ?, ?, ${Date.now()})`,
        [accountId, req.body.movieTitle, req.body.watchAt, Date.now()]
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

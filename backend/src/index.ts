import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { createPool } from 'mariadb';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

const pool = createPool({
  host: 'localhost',
  user: 'hackumbc',
  password: 'hackumbc'
});

app.use(
  auth({
    audience: 'HackUMBC',
    issuerBaseURL: 'https://dev-1grxamuresxko6xk.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  })
);

app.get('/api/friends', async (req, res) => {
  console.log(req.auth?.payload?.sub);
  res.sendStatus(200);
  // const connection = await pool.getConnection();
  // try {
  //   connection.query(
  //     'SELECT second_friend_id FROM friend WHERE first_friend_id = ?',
  //     []
  //   );
  // } finally {
  //   connection.end();
  // }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

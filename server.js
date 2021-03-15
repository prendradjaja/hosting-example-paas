const express = require('express');
const pg = require('pg');

function main() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("FATAL: No DATABASE_URL environment variable was provided");
    return;
  }
  let sslEnabled = true;
  if (process.env.SSL === 'false') {
    sslEnabled = false;
  }
  const sslConfig = sslEnabled ? { rejectUnauthorized: false } : undefined;

  const app = express();
  const PORT = process.env.PORT || 8000;

  const db = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: sslConfig,
  });

  app.use(express.static('./public'));
  app.use(express.json());

  app.get('/api/messages',
    async (req, res) => {
      const { rows } = await db.query('SELECT body FROM message');
      res.send(rows);
    }
  );

  app.post('/api/messages',
    async (req, res) => {
      const messageBody = req.body.messageBody;
      await db.query('INSERT INTO message(body) VALUES ($1)', [messageBody]);
      res.send('{}');
    }
  );

  app.listen(PORT, () => console.log('Listening on port', PORT));
}

main();

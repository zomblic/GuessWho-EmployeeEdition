import express from 'express';
import { QueryResult } from 'pg';
import connectToDb from './client.ts';
import { client } from './client.ts';

await client.connect();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

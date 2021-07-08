import express, {Application, Request, Response} from 'express';
import db from './services/database';

const PORT: number = 5000;
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  const query = `
    SELECT * FROM messages;
  `;

  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
});

app.post('/', (req: Request, res: Response) => {
  res.send('POST');
});

app.put('/', (req: Request, res: Response) => {
  res.send('PUT');
});

app.delete('/', (req: Request, res: Response) => {
  res.send('DELETE');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}.`));

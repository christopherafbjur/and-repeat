import express, {Application, Request, Response} from 'express';
import db from './services/database';

const PORT: number = 5000;
const app: Application = express();

app.use(express.json());

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
  const { title, text } = req.body;

  const query = 'INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING id';
  const values = [title, text];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    res.status(200).send({
      id: result.rows[0].id,
      title,
      text
    });
  });
});

app.put('/', (req: Request, res: Response) => {
  res.send('PUT');
});

app.delete('/', (req: Request, res: Response) => {
  res.send('DELETE');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}.`));

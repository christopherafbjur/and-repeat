import express, {Application, Request, Response} from 'express';

const PORT: number = 5000;
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('GET');
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

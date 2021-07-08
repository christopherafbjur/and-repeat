import express, {Application, } from 'express';
import messages from './routes/messages'

const PORT: number = 5000;
const app: Application = express();

app.use(express.json());
app.use('/', messages)


app.listen(PORT, () => console.log(`Server running on ${PORT}.`));

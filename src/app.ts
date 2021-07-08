import express, {Application } from 'express';
import helmet from 'helmet';
import messages from './routes/messages'
import errorHandler from './middleware/errorHandler';

const PORT: number = 5000;
const app: Application = express();

app.use(helmet())
app.use(express.json());
app.use(errorHandler)
app.use('/api', messages)


app.listen(PORT, () => console.log(`Server running on ${PORT}.`));

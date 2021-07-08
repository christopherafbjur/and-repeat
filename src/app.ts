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

  const query = 'INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING id, title, text';
  const values = [title, text];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    res.status(200).send(result.rows[0]);
  });
});


function updateMessageByID (id: string, cols: any) {
  // Setup static beginning of query
  var query = ['UPDATE messages'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set: any = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')'); 
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push('WHERE id = ' + id );

  query.push('RETURNING id, title, text')

  // Return a complete query string
  return query.join(' ');
}

app.put('/', (req: Request, res: Response) => {
  res.send('You need to provide an id as query parameter.')
})
app.put('/:id', (req: Request, res: Response) => {
  console.log(req.params.id)
  const body = {
    title: req.body.title,
    text: req.body.text
  }
  if(!body.title || !body.text) return res.send('No update data applied');

  var query = updateMessageByID(req.params.id, body);
  var values = Object.keys(body).map(function (key) {
    return req.body[key];
  });
  
  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    res.status(200).send(result.rows[0]);
  });
});

app.delete('/', (req: Request, res: Response) => {
  res.send('You need to provide an id as query parameter.')
})
app.delete('/:id', (req: Request, res: Response) => {
  const query = `DELETE FROM messages WHERE id = $1 RETURNING *`;
  const values = [req.params.id]

  if(!req.params.id) return res.send({message: 'No id specified'})
  
  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    if(!result.rows.length) res.send({message: 'Id not found'})
    res.status(200).send(result.rows[0]);
  });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}.`));

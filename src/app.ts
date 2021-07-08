import express from 'express';

const PORT = 5000;
const app = express();

app.get('/', (req, res) => {
  res.send('GET');
});

app.post('/', (req, res) => {
  res.send('POST');
});

app.put('/', (req, res) => {
  res.send('PUT');
});

app.delete('/', (req, res) => {
  res.send('DELETE');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}.`));

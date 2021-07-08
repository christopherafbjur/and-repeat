import db from '../services/database';

const Model = function(){}

interface MessageBody {
  title: string;
  text: string;
}

Model.getAllMessages = function(){
  const query = `
    SELECT * FROM messages;
  `;

  return new Promise((resolve, reject) => {
    db.query(query, function (err, result) {
      if (err) throw reject(err);
      resolve(result.rows);
      /* res.status(200).send(result.rows); */
    });
  })
}

Model.addMessage = function(data: MessageBody){
  const query: string = 'INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING id, title, text';
  const values: string[] = [data.title, data.text];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) throw reject(err);
      resolve(result.rows[0])
    });
  })
}


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


Model.updateMessage = function(id: string, body: MessageBody){
  var query = updateMessageByID(id, body);
  var values = (Object.keys(body) as Array<keyof typeof body>).map(function (key) {
    return body[key];
  });
  
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) throw reject(err);
      resolve(result.rows[0]);
    });
  })
}


export default Model;
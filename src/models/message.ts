import db from '../services/database';
import {MessageResponse, MessageBody} from './message.types'

const Model = function(){}

Model.getAllMessages = function(): Promise<MessageResponse>{
  const query: string = 'SELECT * FROM messages';

  return new Promise((resolve, reject) => {
    db.query(query, function (err, result) {
      if (err) throw reject(err);
      resolve({
        status: 200,
        data: result.rows
      });
    });
  })
}

Model.addMessage = function(data: MessageBody): Promise<MessageResponse>{
  const query: string = 'INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING id, title, text';
  const values: string[] = [data.title, data.text];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) throw reject(err);
      resolve({
        status: 200,
        data: result.rows
      })
    });
  })
}


Model.updateMessage = function(id: string, body: MessageBody): Promise<MessageResponse>{
  var query = buildUpdateQuery(id, body);
  var values = (Object.keys(body) as Array<keyof typeof body>).map(function (key) {
    return body[key];
  });
  
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) throw reject(err);
      resolve({
        status: 200,
        data: result.rows
      });
    });
  })
}

Model.deleteMessage = function(id: string): Promise<MessageResponse>{
  const query = `DELETE FROM messages WHERE id = $1 RETURNING *`;
  const values = [id]
  
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) throw reject(err);
      
      if(!result.rows.length) resolve({status: 404, message: 'Id not found', data: []})
      resolve({status: 200, data: result.rows})
    });
  })
}

function buildUpdateQuery (id: string, cols: MessageBody): string {
  var query = ['UPDATE messages', 'SET'];

  var set: any = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')'); 
  });
  query.push(set.join(', '));
  query.push('WHERE id = ' + id );
  query.push('RETURNING id, title, text')
  return query.join(' ');
}


export default Model;
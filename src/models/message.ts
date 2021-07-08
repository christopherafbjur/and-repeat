import db from '../services/database';
import {MessageResponse} from './message.types'
import {MessageBody} from '../types'

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
  var {query, values} = buildUpdateQuery(id, body);
  
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
  const query: string = `DELETE FROM messages WHERE id = $1 RETURNING *`;
  const values: string[] = [id]
  
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) throw reject(err);
      
      if(!result.rows.length) resolve({status: 404, message: 'Id not found', data: []})
      resolve({status: 200, data: result.rows})
    });
  })
}

function buildUpdateQuery (id: string, cols: MessageBody): {query: string, values: string[]} {
  const query = ['UPDATE messages', 'SET'];
  const values: string[] = [];
  let set: any = [];
  let index: number = 0;


  (Object.keys(cols) as Array<keyof typeof cols>).forEach(function (key) {
    if(!cols[key]) return delete cols[key];
    set.push(key + ' = ($' + (++index) + ')');
    values.push(cols[key]);
  });
  query.push(set.join(', '));
  query.push('WHERE id = ' + id );
  query.push('RETURNING id, title, text')
  return {query: query.join(' '), values};
}


export default Model;
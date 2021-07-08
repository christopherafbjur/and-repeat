import {Request, Response} from 'express';
import model from '../models/message';
import { MessageBody } from '../types';

export async function get_all_messages(req: Request, res: Response){
  try {
    const {status, data} = await model.getAllMessages();
    res.status(status).send(data);
  } catch (ex) {
    console.error(ex);
  }
}

export async function add_message(req: Request, res: Response){
  const body: MessageBody = {title: req.body.title, text: req.body.text}

  try {
    const {status, data} = await model.addMessage(body);
    res.status(status).send(data);
  } catch (ex) {
    console.error(ex);
  }
}

export async function update_message_by_id(req: Request, res: Response){
  const body: MessageBody = {title: req.body.title, text: req.body.text};

  if(!req.params.id) return res.send({status: 400, message: 'Missing id'});
  if(!body.title || !body.text) return res.send({status: 400, message: 'Missing update data'});

  try {
    const {status, data} = await model.updateMessage(req.params.id, body);
    res.status(status).send(data);
  } catch (ex) {
    console.error(ex);
  }
}



export async function delete_message_by_id(req: Request, res: Response){
  
  if(!req.params.id) return res.send({status: 400, message: 'Missing update data'})
  
  try {
    const {status, data} = await model.deleteMessage(req.params.id);
    res.status(status).send(data);
  } catch (ex) {
    console.error(ex);
  }
}
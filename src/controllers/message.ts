import {Request, Response} from 'express';
import model from '../models/message';

export async function get_all_messages(req: Request, res: Response){

  try {
    const response = await model.getAllMessages();
    res.status(200).send(response);
  } catch (ex) {
    console.error(ex);
  }
}

export async function add_message(req: Request, res: Response){
  const data = {
    title: req.body.title,
    text: req.body.text
  }

  try {
    const response = await model.addMessage(data);
    res.status(200).send(response);
  } catch (ex) {
    console.error(ex);
  }
}




export async function update_message_by_id(req: Request, res: Response){
  const body = {
    title: req.body.title,
    text: req.body.text
  }
  if(!body.title || !body.text) return res.send('No update data applied');
}
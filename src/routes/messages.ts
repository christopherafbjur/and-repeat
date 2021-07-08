import express, {Application, Request, Response} from 'express';
import * as controller from '../controllers/message';
import db from '../services/database';
const router = express.Router();

router.get('/', controller.get_all_messages);
router.post('/', controller.add_message);


router.put('/', (req: Request, res: Response) => {
  res.send('You need to provide an id as query parameter.')
})
router.put('/:id', (req: Request, res: Response) => {
  console.log(req.params.id)
  

  
});

router.delete('/', (req: Request, res: Response) => {
  res.send('You need to provide an id as query parameter.')
})
router.delete('/:id', (req: Request, res: Response) => {
  const query = `DELETE FROM messages WHERE id = $1 RETURNING *`;
  const values = [req.params.id]

  if(!req.params.id) return res.send({message: 'No id specified'})
  
  db.query(query, values, (err, result) => {
    if (err) throw err;
    
    if(!result.rows.length) res.send({message: 'Id not found'})
    res.status(200).send(result.rows[0]);
  });
});

export default router;
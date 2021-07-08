import express from 'express';
import * as controller from '../controllers/message';
const router = express.Router();

router.get('/', controller.get_all_messages);

router.post('/', controller.add_message);

router.put('/', controller.update_message_by_id)
router.put('/:id', controller.update_message_by_id);

router.delete('/', controller.delete_message_by_id)
router.delete('/:id', controller.delete_message_by_id);

export default router;
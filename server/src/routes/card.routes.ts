import { Router } from 'express';
import { CardController } from '../../db/controllers/card.controller';

const router = Router();

router.get('/', CardController.getAll);
router.post('/', CardController.create);
router.delete('/', CardController.deleteAll);

router.get('/:id', CardController.getOne);
router.patch('/:id', CardController.update);
router.delete('/:id', CardController.delete);

router.get('/:id/status', CardController.getStatus);

export default router;

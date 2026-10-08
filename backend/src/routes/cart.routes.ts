import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import { addItemToCartSchema, updateCartItemSchema } from '../validators/cart.validator';
import { idParamSchema } from '../validators/common.validator';

const router = Router();

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/items', validate(addItemToCartSchema), cartController.addItem);
router.patch('/items/:id', validate(updateCartItemSchema), cartController.updateItem);
router.delete('/items/:id', validate(idParamSchema), cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;


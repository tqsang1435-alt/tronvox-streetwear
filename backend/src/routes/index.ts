import { Router } from 'express';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import collectionRoutes from './collection.routes';

import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/collections', collectionRoutes);

export default router;


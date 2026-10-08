import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { validate } from '../middleware/validate';
import { getProductsSchema, createProductSchema, updateProductSchema } from '../validators/product.validator';

import { idParamSchema } from '../validators/common.validator';

const router = Router();

router.get('/', validate(getProductsSchema), productController.getProducts);
router.get('/:id', validate(idParamSchema), productController.getProductById);
router.get('/slug/:slug', productController.getProductBySlug);

// TODO: Protect with Admin auth in Phase 3
router.post('/', validate(createProductSchema), productController.createProduct);
router.patch('/:id', validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', validate(idParamSchema), productController.deleteProduct);

export default router;


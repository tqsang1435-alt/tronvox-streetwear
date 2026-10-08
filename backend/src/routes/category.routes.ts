import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { validate } from '../middleware/validate';
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator';

import { idParamSchema } from '../validators/common.validator';

const router = Router();

router.get('/', categoryController.getCategories);
router.get('/:id', validate(idParamSchema), categoryController.getCategoryById);

// TODO: Protect with Admin auth in Phase 3
router.post('/', validate(createCategorySchema), categoryController.createCategory);
router.patch('/:id', validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', validate(idParamSchema), categoryController.deleteCategory);

export default router;


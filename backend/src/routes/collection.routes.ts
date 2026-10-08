import { Router } from 'express';
import { collectionController } from '../controllers/collection.controller';
import { validate } from '../middleware/validate';
import { createCollectionSchema, updateCollectionSchema } from '../validators/collection.validator';

import { idParamSchema } from '../validators/common.validator';

const router = Router();

router.get('/', collectionController.getCollections);
router.get('/:id', validate(idParamSchema), collectionController.getCollectionById);

// TODO: Protect with Admin auth in Phase 3
router.post('/', validate(createCollectionSchema), collectionController.createCollection);
router.patch('/:id', validate(updateCollectionSchema), collectionController.updateCollection);
router.delete('/:id', validate(idParamSchema), collectionController.deleteCollection);

export default router;


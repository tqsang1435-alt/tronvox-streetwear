import { Request, Response, NextFunction } from 'express';
import { collectionService } from '../services/collection.service';
import { AppError } from '../utils/AppError';

export class CollectionController {
  async getCollections(req: Request, res: Response, next: NextFunction) {
    try {
      const collections = await collectionService.getCollections();
      res.status(200).json({ success: true, data: collections });
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req: Request, res: Response, next: NextFunction) {
    try {
      const collection = await collectionService.getCollectionById(req.params.id as string);
      if (!collection) throw new AppError('Collection not found', 404);
      res.status(200).json({ success: true, data: collection });
    } catch (error) {
      next(error);
    }
  }

  async createCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const collection = await collectionService.createCollection(req.body);
      res.status(201).json({ success: true, data: collection });
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const collection = await collectionService.updateCollection(req.params.id as string, req.body);
      res.status(200).json({ success: true, data: collection });
    } catch (error) {
      next(error);
    }
  }

  async deleteCollection(req: Request, res: Response, next: NextFunction) {
    try {
      await collectionService.deleteCollection(req.params.id as string);
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  }
}

export const collectionController = new CollectionController();

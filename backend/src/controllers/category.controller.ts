import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';
import { AppError } from '../utils/AppError';

export class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.getCategoryById(req.params.id as string);
      if (!category) throw new AppError('Category not found', 404);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.updateCategory(req.params.id as string, req.body);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.deleteCategory(req.params.id as string);
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();

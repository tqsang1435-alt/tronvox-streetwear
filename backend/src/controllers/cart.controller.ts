import { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/cart.service';
import { AuthRequest } from '../middleware/auth';

export class CartController {
  async getCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.getCart(req.user!.id);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  }

  async addItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.addItem(req.user!.id, req.body);
      res.status(201).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.updateItem(req.user!.id, req.params.id as string, req.body);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await cartService.removeItem(req.user!.id, req.params.id as string);
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await cartService.clearCart(req.user!.id);
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  }
}

export const cartController = new CartController();

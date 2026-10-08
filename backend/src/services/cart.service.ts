import prisma from '../utils/prisma';
import { AppError } from '../utils/AppError';

export class CartService {
  
  // Format the cart object to calculate subtotals and counts
  private formatCart(cart: any) {
    if (!cart) {
      return { id: null, items: [], subtotal: 0, itemCount: 0 };
    }

    let subtotal = 0;
    let itemCount = 0;

    const formattedItems = cart.items.map((item: any) => {
      const itemSubtotal = item.quantity * item.variant.product.price;
      subtotal += itemSubtotal;
      itemCount += item.quantity;
      
      return {
        id: item.id,
        quantity: item.quantity,
        unitPrice: item.variant.product.price,
        subtotal: itemSubtotal,
        product: {
          id: item.variant.product.id,
          name: item.variant.product.name,
          slug: item.variant.product.slug,
          images: item.variant.product.images
        },
        variant: {
          id: item.variant.id,
          size: item.variant.size,
          color: item.variant.color,
          stock: item.variant.stock
        }
      };
    });

    return {
      id: cart.id,
      items: formattedItems,
      subtotal,
      itemCount
    };
  }

  async getCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: { orderBy: { order: 'asc' }, take: 1 }
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    return this.formatCart(cart);
  }

  async addItem(userId: string, data: { variantId: string, quantity: number }) {
    const { variantId, quantity } = data;

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true }
    });

    if (!variant) {
      throw new AppError('Variant not found', 404);
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true }
      });
    }

    const existingItem = cart.items.find(item => item.variantId === variantId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      if (newQuantity > variant.stock) {
        throw new AppError(`Cannot add more items. Only ${variant.stock} in stock.`, 400);
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity }
      });
    } else {
      if (quantity > variant.stock) {
        throw new AppError(`Cannot add more items. Only ${variant.stock} in stock.`, 400);
      }

      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity
        }
      });
    }

    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: string, data: { quantity: number }) {
    const { quantity } = data;

    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { variant: true }
    });

    if (!item) {
      throw new AppError('Cart item not found', 404);
    }

    if (item.cartId !== cart.id) {
      throw new AppError('Cart item does not belong to your cart', 403);
    }

    if (quantity > item.variant.stock) {
      throw new AppError(`Cannot update quantity. Only ${item.variant.stock} in stock.`, 400);
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });

    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId }
    });

    if (!item) {
      throw new AppError('Cart item not found', 404);
    }

    if (item.cartId !== cart.id) {
      throw new AppError('Cart item does not belong to your cart', 403);
    }

    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    return { success: true };
  }

  async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      return { success: true };
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return { success: true };
  }
}

export const cartService = new CartService();


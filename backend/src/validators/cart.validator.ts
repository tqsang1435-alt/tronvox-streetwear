import { z } from 'zod';

export const addItemToCartSchema = z.object({
  body: z.object({
    variantId: z.string().uuid('Invalid variant ID format'),
    quantity: z.number().int().positive('Quantity must be a positive integer')
  })
});

export const updateCartItemSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid cart item ID format')
  }),
  body: z.object({
    quantity: z.number().int().positive('Quantity must be a positive integer')
  })
});


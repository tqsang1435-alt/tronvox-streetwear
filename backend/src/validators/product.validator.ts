import { z } from 'zod';

export const getProductsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val) : 12)),
    category: z.string().optional(),
    collection: z.string().optional(),
    search: z.string().optional(),
    badge: z.string().optional(),
    status: z.string().optional(),
    sort: z.string().optional(), // e.g. price_asc, price_desc, newest
  })
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string(),
    price: z.number().positive(),
    material: z.string().optional(),
    badge: z.string().optional(),
    status: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    collectionId: z.string().uuid().optional(),
    images: z.array(z.string().url()).optional(),
    variants: z.array(z.object({
      size: z.string(),
      color: z.string(),
      stock: z.number().int().min(0)
    })).optional()
  })
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    material: z.string().optional(),
    badge: z.string().optional(),
    status: z.string().optional(),
    categoryId: z.string().uuid().optional().nullable(),
    collectionId: z.string().uuid().optional().nullable(),
  })
});


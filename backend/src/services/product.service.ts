import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export class ProductService {
  async getProducts(params: {
    page: number;
    limit: number;
    category?: string;
    collection?: string;
    search?: string;
    badge?: string;
    status?: string;
    sort?: string;
  }) {
    const { page, limit, category, collection, search, badge, status, sort } = params;
    
    const pageNum = parseInt(page as any) || 1;
    const limitNum = parseInt(limit as any) || 20;
    const skip = (pageNum - 1) * limitNum;

    const where: Prisma.ProductWhereInput = {
      ...(status && { status }),
      ...(badge && { badge }),
      ...(category && { category: { slug: category } }),
      ...(collection && { collection: { slug: collection } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'newest') orderBy = { createdAt: 'desc' };

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        include: {
          category: true,
          collection: true,
          images: { orderBy: { order: 'asc' } },
          variants: true
        }
      })
    ]);

    return {
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        collection: true,
        images: { orderBy: { order: 'asc' } },
        variants: true
      }
    });
  }

  async getProductBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        collection: true,
        images: { orderBy: { order: 'asc' } },
        variants: true
      }
    });
  }

  async createProduct(data: any) {
    const { images, variants, ...productData } = data;
    
    return prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images?.map((url: string, index: number) => ({ url, order: index })) || []
        },
        variants: {
          create: variants || []
        }
      },
      include: {
        images: true,
        variants: true
      }
    });
  }

  async updateProduct(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data
    });
  }

  async deleteProduct(id: string) {
    return prisma.product.delete({
      where: { id }
    });
  }
}

export const productService = new ProductService();

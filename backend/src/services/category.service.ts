import prisma from '../utils/prisma';

export class CategoryService {
  async getCategories() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async getCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id }
    });
  }

  async createCategory(data: any) {
    return prisma.category.create({ data });
  }

  async updateCategory(id: string, data: any) {
    return prisma.category.update({
      where: { id },
      data
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id }
    });
  }
}

export const categoryService = new CategoryService();


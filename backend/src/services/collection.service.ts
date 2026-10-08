import prisma from '../utils/prisma';

export class CollectionService {
  async getCollections() {
    return prisma.collection.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCollectionById(id: string) {
    return prisma.collection.findUnique({
      where: { id }
    });
  }

  async createCollection(data: any) {
    return prisma.collection.create({ data });
  }

  async updateCollection(id: string, data: any) {
    return prisma.collection.update({
      where: { id },
      data
    });
  }

  async deleteCollection(id: string) {
    return prisma.collection.delete({
      where: { id }
    });
  }
}

export const collectionService = new CollectionService();


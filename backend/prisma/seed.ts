import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productsData = [
  {
    slug: "heavyweight-blush-hoodie",
    name: "Heavyweight Blush Oversized Hoodie",
    price: 185,
    color: "Blush Pink",
    categoryName: "Hoodies & Sweats",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-hoodie-pink.jpg"],
    description: "A heavyweight everyday hoodie designed with a relaxed architectural silhouette.",
    material: "500 GSM organic heavyweight fleece",
    badge: "NEW DROP"
  },
  {
    slug: "heavyweight-black-hoodie",
    name: "Studio Black Oversized Hoodie",
    price: 185,
    color: "Studio Black",
    categoryName: "Hoodies & Sweats",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-hoodie-black.jpg"],
    description: "A heavyweight everyday hoodie designed with a relaxed architectural silhouette.",
    material: "500 GSM organic heavyweight fleece",
    badge: "ESSENTIAL"
  },
  {
    slug: "heavyweight-blush-sweatpants",
    name: "Heavyweight Blush Sweatpants",
    price: 145,
    color: "Blush Pink",
    categoryName: "Pants",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-sweatpants-pink.jpg"],
    description: "Structured sweatpants balancing understated luxury with everyday luxury.",
    material: "500 GSM organic heavyweight fleece",
    badge: "LIMITED"
  },
  {
    slug: "heavyweight-black-sweatpants",
    name: "Studio Black Sweatpants",
    price: 145,
    color: "Studio Black",
    categoryName: "Pants",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-sweatpants-black.jpg"],
    description: "Structured sweatpants balancing understated luxury with everyday utility.",
    material: "500 GSM organic heavyweight fleece",
    badge: "ESSENTIAL"
  }
];

async function main() {
  console.log('Seeding database...');
  
  // Create categories
  for (const p of productsData) {
    await prisma.category.upsert({
      where: { slug: p.categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') },
      update: {},
      create: {
        name: p.categoryName,
        slug: p.categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
      }
    });
  }

  const categories = await prisma.category.findMany();

  // Create products
  for (const p of productsData) {
    const category = categories.find(c => c.name === p.categoryName);
    
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        material: p.material,
        badge: p.badge,
        categoryId: category?.id,
      }
    });

    // Create images
    for (let i = 0; i < p.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: p.images[i],
          order: i
        }
      });
    }

    // Create variants (sizes)
    for (const size of p.sizes) {
      await prisma.productVariant.upsert({
        where: {
          productId_size_color: {
            productId: product.id,
            size: size,
            color: p.color
          }
        },
        update: {},
        create: {
          productId: product.id,
          size: size,
          color: p.color,
          stock: 20 // Default stock
        }
      });
    }
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//  Convert DB (snake_case) to Frontend (camelCase)
export const mapProductFromDB = (p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image: p.image,
  description: p.description,
  slug: p.slug,
  category: p.category,
  stock: p.stock,
  isBestSeller: p.is_best_seller,
  isFeatured: p.is_featured,
  date: p.created_at,
});

// convert Frontend to DB (for PATCH/CREATE)
export const mapProductToDB = (p) => ({
  name: p.name,
  price: p.price,
  image: p.image,
  description: p.description,
  slug: p.slug,
  category: p.category,
  stock: p.stock,
  is_best_seller: p.isBestSeller,
  is_featured: p.isFeatured,
});

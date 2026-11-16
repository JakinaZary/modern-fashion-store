import { getCurrentPrice } from "../data/products.js";

export function filterProducts(products, { query = "", category = "", maxPrice = Infinity, sort = "featured" } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const selectedCategory = category.toLocaleLowerCase("fr");
  const filtered = products.filter((product) => {
    const searchable = `${product.name} ${product.description} ${product.category} ${product.audience}`.toLocaleLowerCase("fr");
    const matchesCategory = !selectedCategory || product.category === selectedCategory || product.audience === selectedCategory;
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && matchesCategory && getCurrentPrice(product) <= maxPrice;
  });
  if (sort === "price-asc") filtered.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b));
  if (sort === "price-desc") filtered.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a));
  if (sort === "newest") filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  if (sort === "popular") filtered.sort((a, b) => Number(b.popular) - Number(a.popular));
  return filtered;
}

import catSofa from '../assets/images/banner-1.1.webp';
import catAdsSmall from '../assets/images/ads-2.1.webp';
import catAdsBig from '../assets/images/ads-2.4.webp';

export const categories = [
  { id: 1, name: 'Sofa', image: catSofa },
  { id: 2, name: 'Mobile', image: catAdsSmall },
  { id: 3, name: 'Game', image: catAdsBig },
  { id: 4, name: 'Cosmetic', image: catAdsSmall },
  { id: 5, name: 'Electronics', image: catAdsBig },
  { id: 6, name: 'Speaker', image: catAdsSmall },
  { id: 7, name: 'Camera', image: catAdsBig },
  { id: 8, name: 'Furniture', image: catSofa },
];

// Navigation menu categories for drawer
export const menuCategories = [
  { id: 1, name: 'Electronics', subcategories: ['Laptops', 'Phones', 'Tablets', 'Cameras'] },
  { id: 2, name: 'Fashion', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
  { id: 3, name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
  { id: 4, name: 'Sports', subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Camping'] },
  { id: 5, name: 'Books', subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational'] },
  { id: 6, name: 'Beauty', subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance'] },
  { id: 7, name: 'Toys', subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational'] },
  { id: 8, name: 'Automotive', subcategories: ['Parts', 'Tools', 'Accessories', 'Care'] },
];

export default categories;

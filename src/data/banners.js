// Banner data for hero and promotional sections
// Import local images
import heroBanner1 from '../assets/images/banner-1.1.webp';
import heroBanner2 from '../assets/images/banner-2.2.webp';
import adsBanner1 from '../assets/images/ads-2.1.webp';
import adsBanner2 from '../assets/images/ads-2.2.webp';
import adsBanner3 from '../assets/images/ads-2.3.webp';
import adsBanner4 from '../assets/images/ads-2.4.webp';
import campaignCover from '../assets/images/campaign-cover-countdown-2.webp';
import discountBanner from '../assets/images/discount-banner-2.webp';

export const heroBanners = [
  {
    id: 1,
    title: 'Pouf Ottomans cloth',
    subtitle: 'NEW RELEASED',
    description: 'Special-shaped sofa for sale',
    image: heroBanner1,
    link: '/shop/sofa',
    bgColor: '#f0f4f8',
    type: 'large'
  },
  {
    id: 2,
    title: 'Motozed Reclein Sofa',
    subtitle: 'RELEXT SOFA',
    description: 'Premium furniture',
    image: heroBanner2,
    link: '/shop/luxury',
    bgColor: '#f8f4f0',
    type: 'stacked'
  },
  {
    id: 3,
    title: 'Luxury Collection',
    subtitle: 'MODERN CHAIR',
    description: 'Style your home',
    image: adsBanner3,
    link: '/shop/collection',
    bgColor: '#e8f4f8',
    type: 'stacked'
  },
];

export const promoBanners = [
  {
    id: 1,
    title: 'Get the best deals',
    subtitle: 'Sales 40%',
    description: 'Get trendy items',
    image: adsBanner1,
    link: '/shop/deals',
    bgColor: '#fff9e6',
  },
  {
    id: 2,
    title: 'Trendy Collection',
    subtitle: 'New Season',
    description: 'Best deals on furniture',
    image: adsBanner2,
    link: '/shop/collection',
    bgColor: '#e8f4f8',
  },
];

export const adsData = [
  {
    id: 1,
    image: adsBanner1,
    link: '/shop/ads-1',
    alt: 'Promotion Banner 1',
  },
  {
    id: 2,
    image: adsBanner2,
    link: '/shop/ads-2',
    alt: 'Promotion Banner 2',
  },
  {
    id: 3,
    image: adsBanner3,
    link: '/shop/ads-3',
    alt: 'Promotion Banner 3',
  },
  {
    id: 4,
    image: adsBanner4,
    link: '/shop/ads-4',
    alt: 'Promotion Banner 4',
  },
];

export const flashDealData = {
  title: 'WOO! Flash Sale',
  subtitle: 'Limited time offer',
  image: campaignCover,
  endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  bgColor: '#ffebb2',
  products: [1, 3, 4, 7], // Product IDs from products.js
};

export const discountBannerData = {
  image: discountBanner,
  link: '/shop/discount',
  alt: 'Discount Banner',
};

export default { heroBanners, promoBanners, adsData, flashDealData, discountBannerData };

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Grid, IconButton, Button, Stack, CircularProgress } from '@mui/material';

// Fallback static products
import imgSofa from '../assets/images/banner-1.1.webp';
import imgChair from '../assets/images/banner-2.2.webp';
import imgAd1 from '../assets/images/ads-2.1.webp';
import imgAd2 from '../assets/images/ads-2.2.webp';
import imgAd3 from '../assets/images/ads-2.3.webp';

const fallbackProducts = [
  { id: 1, name: 'Modern Leather Sofa',      salePrice: 18.74, oldPrice: 34.99, image: imgSofa  },
  { id: 2, name: 'Geofarm nulla tempor',     salePrice: 20.72, oldPrice: 22.97, image: imgChair },
  { id: 3, name: 'Zoxy quis amet',           salePrice: 25.53, oldPrice: 31.24, image: imgAd1  },
  { id: 4, name: 'Ergonomic Office Chair',   salePrice: 19.99, oldPrice: 28.50, image: imgAd2  },
  { id: 5, name: 'Scandinavian Dining Set',  salePrice: 22.18, oldPrice: 30.00, image: imgChair },
  { id: 6, name: 'Luxury Bedframe King',     salePrice: 31.45, oldPrice: 45.00, image: imgAd3  },
];

// SVG icons
const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const FeaturedProducts = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products mapping directly to your provided parameters
        const res = await axios.get('https://knowledgeshop.runasp.net/api/Products', {
          params: {
            page: 1,
            limit: 6,
            sortBy: 'price',
            ascending: false
          },
          headers: { 'Accept-Language': 'en' },
        });

        console.log("Featured Products API Response:", res.data);

        // Resolve data from varying payload shapes (pagination objects, etc.)
        let rawData = res.data;
        let productsArray = [];

        if (Array.isArray(rawData)) {
          productsArray = rawData;
        } else if (rawData && Array.isArray(rawData.items)) {
          productsArray = rawData.items;
        } else if (rawData && Array.isArray(rawData.data)) {
          productsArray = rawData.data;
        } else if (rawData && Array.isArray(rawData.products)) {
          productsArray = rawData.products;
        } else if (rawData?.response && Array.isArray(rawData.response)) {
          productsArray = rawData.response;
        } else if (rawData?.response?.data && Array.isArray(rawData.response.data)) {
          productsArray = rawData.response.data;
        }

        if (productsArray.length > 0) {
          setProducts(productsArray.map((p, i) => ({
            id: p.id ?? i,
            name: p.name ?? p.title ?? 'Product',
            salePrice: p.price ?? p.salePrice ?? 0,
            oldPrice: p.oldPrice ?? p.originalPrice ?? null,
            image: p.mainImage ?? p.image ?? p.imageUrl ?? fallbackProducts[i % fallbackProducts.length].image,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch user products:', error);
        // Keep fallback data if API fails
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <Box component="section" sx={{ py: 6, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3, pb: 1.5, borderBottom: '1px solid #e5e7eb' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', m: 0 }}>
            Featured Products
          </Typography>
          <Button
            component={Link}
            to="/shop"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: '#1a1a1a',
              textTransform: 'none',
              '&:hover': { color: '#2b6b6b', bgcolor: 'transparent' },
            }}
            disableRipple
          >
            View More &rarr;
          </Button>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress sx={{ color: '#2b6b6b' }} />
          </Box>
        ) : (
          /* Grid Container */
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: '3px',
              bgcolor: '#e5e7eb',
              border: '1px solid #e5e7eb',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

/* ── individual card ─────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const { name, salePrice, oldPrice, image } = product;

  return (
    <Box
      sx={{
        bgcolor: '#f7f8f9',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: '#fff',
        },
        '&:hover .product-img': {
          transform: 'scale(1.04)',
        },
        '&:hover .side-actions': {
          transform: 'translateY(-50%) translateX(0)',
          opacity: 1,
        },
        '&:hover .add-to-cart': {
          bottom: 0,
        },
      }}
    >
      {/* Image Area */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          bgcolor: '#f7f8f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          className="product-img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.35s ease',
          }}
        />

        {/* Side Actions */}
        <Stack
          className="side-actions"
          direction="column"
          spacing={1}
          sx={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%) translateX(60px)',
            opacity: 0,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            zIndex: 3,
          }}
        >
          {['Quick View', 'Wishlist', 'Compare'].map((tooltip, i) => (
            <IconButton
              key={tooltip}
              title={tooltip}
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#fff',
                color: '#444',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                '&:hover': { bgcolor: '#2b6b6b', color: '#fff' },
              }}
            >
              {i === 0 ? <ExpandIcon /> : i === 1 ? <HeartIcon /> : <RefreshIcon />}
            </IconButton>
          ))}
        </Stack>

        {/* Add to Cart Bar */}
        <Box
          className="add-to-cart"
          sx={{
            position: 'absolute',
            bottom: -48,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'bottom 0.3s ease',
            zIndex: 3,
          }}
        >
          <Button
            fullWidth
            sx={{
              py: 1.5,
              bgcolor: '#2b6b6b',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.3px',
              borderRadius: 0,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#224f4f',
              },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>

      {/* Info Area */}
      <Box sx={{ p: '14px 16px 18px', textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: '#1a1a1a',
            mb: 0.75,
            lineHeight: 1.4,
          }}
        >
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#ef262c' }}>
            BDT{Number(salePrice).toFixed(2)}
          </Typography>
          {oldPrice && (
            <Typography sx={{ fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>
              BDT{Number(oldPrice).toFixed(2)}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;

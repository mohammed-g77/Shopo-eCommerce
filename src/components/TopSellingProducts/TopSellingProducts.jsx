import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Stack, Button, Grid, CircularProgress } from '@mui/material';

// Fallbacks for empty states / errors
import imgChair from '../../assets/images/banner-2.2.webp';
import imgSofa from '../../assets/images/banner-1.1.webp';
import discountBanner from '../../assets/images/discount-banner-2.webp';
import adsBanner3 from '../../assets/images/ads-2.3.webp';

const fallbackProducts = [
  { id: 201, name: 'Senmei ipsum dolore',     salePrice: 27.61, oldPrice: 20.64, image: imgChair },
  { id: 202, name: 'Canopoly duis voluptate', salePrice: 10.42, oldPrice: 39.27, image: imgSofa  },
  { id: 203, name: 'Unisure aliqua repreh',   salePrice: 16.43, oldPrice: 36.90, image: imgChair },
  { id: 204, name: 'Kenegy consectetur id',   salePrice: 11.92, oldPrice: 26.62, image: imgSofa  },
];

const TopSellingProducts = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchTopSellingProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://knowledgeshop.runasp.net/api/Products', {
          params: {
            page: 1,
            limit: 4, // Exactly 4 elements match the Grid layout in the screenshot
            sortBy: 'price',
            ascending: false
          },
          headers: { 'Accept-Language': 'en' },
        });

        if (!isSubscribed) return;

        let rawData = res.data;
        let productsArray = [];

        if (Array.isArray(rawData)) productsArray = rawData;
        else if (rawData?.items && Array.isArray(rawData.items)) productsArray = rawData.items;
        else if (rawData?.data && Array.isArray(rawData.data)) productsArray = rawData.data;
        else if (rawData?.products && Array.isArray(rawData.products)) productsArray = rawData.products;
        else if (rawData?.response && Array.isArray(rawData.response)) productsArray = rawData.response;
        else if (rawData?.response?.data && Array.isArray(rawData.response.data)) productsArray = rawData.response.data;

        if (productsArray.length > 0) {
          setProducts(productsArray.map((p, i) => ({
            id: p.id ?? i,
            name: p.name ?? p.title ?? 'Product',
            salePrice: p.price ?? p.salePrice ?? 0,
            oldPrice: p.oldPrice ?? p.originalPrice ?? null,
            image: p.mainImage ?? p.imageUrl ?? p.image ?? fallbackProducts[i % fallbackProducts.length].image,
          })));
        } else {
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error('Failed to fetch Top Selling products:', error);
        if (isSubscribed) setProducts(fallbackProducts);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchTopSellingProducts();

    return () => { isSubscribed = false; };
  }, []);

  return (
    <Box component="section" sx={{ py: 6, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4, pb: 1.5, borderBottom: '1px solid #e5e7eb' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', m: 0 }}>
            Top Selling Products
          </Typography>
          <Button
            component={Link}
            to="/shop"
            sx={{
              fontSize: 14,
              fontWeight: 600,
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
          /* Grid - 2 columns on desktop, 1 on mobile */
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} md={6} key={product.id}>
                <HorizontalProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Full Width Bottom Banner */}
        <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
         
          {/* Promotion Banner 3 Added here */}
          <Link to="/shop/collection" style={{ display: 'block', overflow: 'hidden', borderRadius: '4px' }}>
            <Box
            component="img"
            src={adsBanner3}
            alt="Promotion Banner 3"
            sx={{
              width: '100%',
              display: 'block',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

/* ── Horizontal Inline Card ──────────────────────────────────── */
const HorizontalProductCard = ({ product }) => {
  const { name, salePrice, oldPrice, image } = product;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        bgcolor: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: 1,
        transition: 'box-shadow 0.2sease, transform 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        },
        '&:hover .product-img': {
          transform: 'scale(1.05)',
        }
      }}
    >
      {/* Grey Image Area */}
      <Box
        sx={{
          width: { xs: 110, sm: 140 },
          height: { xs: 110, sm: 140 },
          bgcolor: '#f2f6f6',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          overflow: 'hidden',
          p: 1.5
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
            transition: 'transform 0.4s ease',
          }}
        />
      </Box>

      {/* Info Area */}
      <Box sx={{ ml: { xs: 2, sm: 4 }, flex: 1 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: '#1a1a1a',
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#ef262c' }}>
            BDT{Number(salePrice).toFixed(2)}
          </Typography>
          {oldPrice && (
            <Typography sx={{ fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>
              BDT{Number(oldPrice).toFixed(2)}
            </Typography>
          )}
        </Stack>

        <Button
          sx={{
            bgcolor: '#2b6b6b',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.2px',
            borderRadius: 0.5,
            px: 2.5,
            py: 0.75,
            transition: 'background-color 0.2s',
            '&:hover': {
              bgcolor: '#1e4e4e',
            },
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
};

export default TopSellingProducts;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Grid, Stack, Button, CircularProgress } from '@mui/material';

// Fallback images
import imgSofa from '../assets/images/banner-1.1.webp';
import imgChair from '../assets/images/banner-2.2.webp';
import imgAd1 from '../assets/images/ads-2.1.webp';
import imgAd2 from '../assets/images/ads-2.2.webp';
import imgAd3 from '../assets/images/ads-2.3.webp';

// Generates 12 fallback products
const fallbackProducts = Array.from({ length: 12 }).map((_, index) => {
  const images = [imgSofa, imgChair, imgAd1, imgAd2, imgAd3];
  const names = [
    'Callflex dolore eiusmod', 'Quintity consequat', 'Empirica deserunt laborum',
    'Geofarm nulla tempor', 'Zizzle ad proident', 'Conjurica ea magna',
    'Zoxy quis amet', 'Comvoy irure occaecat', 'Plasto cillum',
    'Musaphics consequat...', 'Bluplanet consequat', 'Anarco consectetur magna'
  ];
  return {
    id: index + 100,
    name: names[index],
    salePrice: (Math.random() * 20 + 10).toFixed(2),
    oldPrice: (Math.random() * 20 + 30).toFixed(2),
    image: images[index % images.length],
  };
});

const PopularSales = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://knowledgeshop.runasp.net/api/Products', {
          params: {
            page: 1,
            limit: 12,
            sortBy: 'id',
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
          // Fill up to 12 if less are returned just to keep the UI layout perfect
          let processedList = productsArray.map((p, i) => ({
            id: p.id ?? i,
            name: p.name ?? p.title ?? 'Product',
            salePrice: p.price ?? p.salePrice ?? 0,
            oldPrice: p.oldPrice ?? p.originalPrice ?? null,
            image: p.mainImage ?? p.image ?? p.imageUrl ?? fallbackProducts[i % fallbackProducts.length].image,
          }));

          while (processedList.length < 12) {
             processedList.push(fallbackProducts[processedList.length]);
          }

          setProducts(processedList.slice(0, 12));
        }
      } catch (error) {
        console.error('Failed to fetch popular sales:', error);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchProducts();
    return () => { isSubscribed = false; };
  }, []);

  return (
    <Box component="section" sx={{ py: 6, bgcolor: '#f7f8f9' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', m: 0 }}>
            Popular Sales
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
          <Box display="flex" justifyContent="center" py={5} >
            <CircularProgress sx={{ color: '#2b6b6b' }} />
          </Box>
        ) : (
          /* Main 3-Column Grid */
          <Grid container spacing={3}>
            {/* Column 1 */}
            <Grid item xs={12} md={4}>
              <ColumnBox products={products.slice(0, 4)} />
            </Grid>
            {/* Column 2 */}
            <Grid item xs={12} md={4}>
              <ColumnBox products={products.slice(4, 8)} />
            </Grid>
            {/* Column 3 */}
            <Grid item xs={12} md={4}>
              <ColumnBox products={products.slice(8, 12)} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

/* ── Wrapper for each cluster of 4 items ─────────────────────── */
const ColumnBox = ({ products }) => {
  return (
    <Box sx={{ bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
      {products.map((p, i) => (
        <HorizontalListItem key={p.id} product={p} isLast={i === products.length - 1} />
      ))}
    </Box>
  );
};

/* ── Individual Mini Horizontal Item ─────────────────────────── */
const HorizontalListItem = ({ product, isLast }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      component={Link}
      to={`/product/${product.id}`}
      sx={{
        p: 2,
        ml:5,
        borderBottom: isLast ? 'none' : '1px solid #f0f0f0',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: '#fbfbfb' },
        '&:hover .title': { color: '#2b6b6b' },
        '&:hover .img-img': { transform: 'scale(1.1)' }
      }}
    >
      {/* Small Left Image */}
      <Box
        sx={{
          width: 76,
          height: 76,
          bgcolor: '#f7f8f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1.5,
          flexShrink: 0,
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          className="img-img"
          src={product.image}
          alt={product.name}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
        />
      </Box>

      {/* Right Details */}
      <Box>
        <Typography
          className="title"
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1a1a1a',
            mb: 0.5,
            transition: 'color 0.2s',
            lineHeight: 1.3
          }}
        >
          {product.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          {product.oldPrice && (
            <Typography sx={{ fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>
              BDT{Number(product.oldPrice).toFixed(2)}
            </Typography>
          )}
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#ef262c' }}>
            BDT{Number(product.salePrice).toFixed(2)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default PopularSales;

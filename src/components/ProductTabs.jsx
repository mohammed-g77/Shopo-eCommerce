import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, IconButton, Button, Stack, CircularProgress, Tabs, Tab } from '@mui/material';

// Fallbacks for empty states / errors
import imgSofa from '../assets/images/banner-1.1.webp';
import imgChair from '../assets/images/banner-2.2.webp';

const fallbackProducts = [
  { id: 101, name: 'Senmei ipsum dolore',     salePrice: 27.61, oldPrice: 20.64, image: imgChair },
  { id: 102, name: 'Canopoly duis voluptate', salePrice: 10.42, oldPrice: 39.27, image: imgSofa  },
  { id: 103, name: 'Unisure aliqua repreh',   salePrice: 16.43, oldPrice: 36.90, image: imgChair },
  { id: 104, name: 'Autem ducimus fugiat',    salePrice: 21.00, oldPrice: 25.00, image: imgSofa  },
];

// Inline SVG icons
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

const tabsConfig = [
  { label: 'Featured',    category: 'featured',    sortBy: 'price', ascending: false },
  { label: 'New Arrival', category: 'new',         sortBy: 'id',    ascending: false },
  { label: 'Best Selling', category: 'bestselling', sortBy: 'price', ascending: true  },
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchTabProducts = async () => {
      setLoading(true);
      try {
        const config = tabsConfig[activeTab];
        // Use your provided API with dynamic sorting depending on the Tab
        const res = await axios.get('https://knowledgeshop.runasp.net/api/Products', {
          params: {
            page: 1,
            limit: 8,
            sortBy: config.sortBy,
            ascending: config.ascending
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
        console.error('Failed to fetch tab products:', error);
        if (isSubscribed) setProducts(fallbackProducts);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchTabProducts();

    return () => { isSubscribed = false; };
  }, [activeTab]);

  return (
    <Box component="section" sx={{ py: 6, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
         <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          gap={2}
          sx={{ mb: 4 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
            Popular Sales
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: '#2b6b6b', height: '3px', borderRadius: '2px' } }}
            sx={{
              minHeight: '40px',
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: 15,
                color: '#6b7280',
                textTransform: 'none',
                minHeight: '40px',
                px: 2,
                transition: 'all 0.2s',
              },
              '& .Mui-selected': {
                color: '#2b6b6b !important',
              },
            }}
          >
            {tabsConfig.map((tab, i) => (
              <Tab key={tab.category} label={tab.label} />
            ))}
          </Tabs>

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
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress sx={{ color: '#2b6b6b' }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {products.map((product) => (
              <PopularCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

const PopularCard = ({ product }) => {
  const { name, salePrice, oldPrice, image } = product;

  return (
    <Box
      sx={{
        bgcolor: '#f7f8f9',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        border: '1px solid #f0f0f0',
        borderRadius: '4px',
        '&:hover': {
          bgcolor: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
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
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          bgcolor: '#f7f8f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
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
              '&:hover': { bgcolor: '#224f4f' },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: '14px 16px 18px', textAlign: 'center', bgcolor: '#fff' }}>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: '#1a1a1a',
            mb: 0.75,
            lineHeight: 1.4,
          }}
        >
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#ef262c' }}>
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

export default ProductTabs;

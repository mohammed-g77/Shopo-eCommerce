import { Box, Typography, CircularProgress, Grid, Container } from '@mui/material';
import { useCategories } from "../../hooks/useCategories";

// MUI Icons
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DevicesIcon from '@mui/icons-material/Devices';
import HailIcon from '@mui/icons-material/Hail';
import WatchIcon from '@mui/icons-material/Watch';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SpaIcon from '@mui/icons-material/Spa';
import CategoryIcon from '@mui/icons-material/Category';

const getCategoryIcon = (name) => {
  if (!name) return <CategoryIcon />;

  const key = name.toLowerCase();

  if (key.includes('mobile')) return <SmartphoneIcon />;
  if (key.includes('clothes')) return <CheckroomIcon />;
  if (key.includes('electronic')) return <DevicesIcon />;
  if (key.includes('shoe')) return <HailIcon />;
  if (key.includes('access')) return <WatchIcon />;
  if (key.includes('home')) return <KitchenIcon />;
  if (key.includes('beauty')) return <SpaIcon />;

  return <CategoryIcon />;
};

export default function Categories() {
  const { isLoading, isError, data } = useCategories();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error</Typography>;

  return (
    
    <Box sx={{ py: 5, textAlign: 'center' }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Market Category
        </Typography>

        <Typography
          sx={{
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#000",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          View More →
        </Typography>
      </Box>

        <Grid container spacing={4} justifyContent="center">
          {data.map((cat) => (
            <Grid item key={cat.id} xs={6} sm={4} md={3} lg={2}>
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    mx: 'auto',
                    borderRadius: '50%',
                    bgcolor: '#f2f6f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2b6b6b',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#2b6b6b',
                      color: '#fff',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {getCategoryIcon(cat.name)}
                </Box>

                <Typography sx={{ mt: 1.5, fontWeight: 500 }}>
                  {cat.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

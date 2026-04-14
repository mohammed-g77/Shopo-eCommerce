import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box, Container, Typography, Pagination, Stack,
  Alert, Skeleton, Tooltip,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/shared/ProductCard";
import ProductCardSkeleton from "../../components/shared/ProductCardSkeleton";
import ShopListCard from "./ShopListCard";
import styles from "./Shop.module.css";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { label: "Price: High to Low", sortBy: "price", ascending: false },
  { label: "Price: Low to High", sortBy: "price", ascending: true  },
  { label: "Newest First",       sortBy: "id",    ascending: false },
  { label: "Oldest First",       sortBy: "id",    ascending: true  },
];

// TODO: WAITING FOR API SUPPORT — category filter endpoint not documented
const MOCK_CATEGORIES = ["All", "Electronics", "Clothing", "Home & Garden", "Accessories", "Beauty"];

// TODO: WAITING FOR API SUPPORT — price range filter not documented
const PRICE_RANGES = ["Under $25", "$25 – $50", "$50 – $100", "Over $100"];

// TODO: WAITING FOR API SUPPORT — rating filter not documented
const RATINGS = [5, 4, 3, 2, 1];

// ─── Shop Page ────────────────────────────────────────────────────────────────

const Shop = () => {
  const [page, setSortPage]   = useState(1);
  const [sortIdx, setSortIdx] = useState(0);
  const [viewMode, setView]   = useState("grid"); // "grid" | "list"

  const { sortBy, ascending } = SORT_OPTIONS[sortIdx];

  const { data, isLoading, isError } = useProducts({
    page,
    limit: PAGE_SIZE,
    sortBy,
    ascending,
  });

  const products = data?.items || [];
  const safeTotalPages = data?.totalPages || 1;

  const handleSortChange = (e) => {
    setSortIdx(Number(e.target.value));
    setSortPage(1);
  };

  const handlePageChange = (_, value) => {
    setSortPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.shopPage}>
      {/* ── Breadcrumb Bar ──────────────────────────────────────────────── */}
      <div className={styles.breadcrumbBar}>
        <div className="container-x">
          <nav className={styles.breadcrumbInner} aria-label="breadcrumb">
            <Link to="/home" className={styles.breadcrumbLink}>
              <HomeIcon sx={{ fontSize: 15, verticalAlign: "middle", mr: 0.5 }} />
              Home
            </Link>
            <NavigateNextIcon sx={{ fontSize: 16, color: "#d1d5db" }} />
            <span className={styles.breadcrumbCurrent}>Shop</span>
          </nav>
        </div>
      </div>

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div className="container-x">
          <h1 className={styles.pageTitle}>All Products</h1>
          <p className={styles.pageSubtitle}>
            {isLoading
              ? "Loading…"
              : isError
              ? "Could not load results."
              : `Showing ${products.length} products — page ${page}`}
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className={styles.contentArea}>
        <div className="container-x">
          <div className={styles.layout}>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className={styles.sidebar}>

              {/* Category Filter — TODO: WAITING FOR API SUPPORT */}
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>
                  Category
                  <span className={styles.todoLabel}>UI Only</span>
                </h3>
                {MOCK_CATEGORIES.map((cat) => (
                  <div key={cat} className={styles.filterItem} title="TODO: WAITING FOR API SUPPORT" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <div className={styles.filterCheckbox} />
                    <span className={styles.filterLabel}>{cat}</span>
                  </div>
                ))}
              </div>

              {/* Price Range — TODO: WAITING FOR API SUPPORT */}
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>
                  Price Range
                  <span className={styles.todoLabel}>UI Only</span>
                </h3>
                <div className={styles.priceSliderTrack}>
                  <div className={styles.priceSliderFill} />
                </div>
                <div className={styles.priceRange}>
                  <span>$0</span>
                  <span>$500</span>
                </div>
                {PRICE_RANGES.map((range) => (
                  <div key={range} className={styles.filterItem} title="TODO: WAITING FOR API SUPPORT" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <div className={styles.filterCheckbox} />
                    <span className={styles.filterLabel}>{range}</span>
                  </div>
                ))}
              </div>

              {/* Rating Filter — TODO: WAITING FOR API SUPPORT */}
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>
                  Rating
                  <span className={styles.todoLabel}>UI Only</span>
                </h3>
                {RATINGS.map((r) => (
                  <div key={r} className={styles.filterItem} title="TODO: WAITING FOR API SUPPORT" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <div className={styles.filterCheckbox} />
                    <span className={styles.filterLabel}>
                      {"★".repeat(r)}{"☆".repeat(5 - r)} &amp; up
                    </span>
                  </div>
                ))}
              </div>

            </aside>

            {/* ── Main Product Area ────────────────────────────────────── */}
            <div>
              {/* Toolbar */}
              <div className={styles.toolbar}>
                <span className={styles.resultCount}>
                  {isLoading ? (
                    <Skeleton width={120} />
                  ) : (
                    `${products.length} products on page ${page}`
                  )}
                </span>

                <div className={styles.toolbarRight}>
                  {/* Sort */}
                  <select
                    className={styles.sortSelect}
                    value={sortIdx}
                    onChange={handleSortChange}
                    aria-label="Sort products"
                  >
                    {SORT_OPTIONS.map((opt, i) => (
                      <option key={i} value={i}>{opt.label}</option>
                    ))}
                  </select>

                  {/* Grid / List Toggle */}
                  <div className={styles.viewToggle}>
                    <Tooltip title="Grid view">
                      <button
                        className={`${styles.viewBtn} ${viewMode === "grid" ? styles.active : ""}`}
                        onClick={() => setView("grid")}
                        aria-label="Grid view"
                      >
                        <ViewModuleIcon sx={{ fontSize: 18 }} />
                      </button>
                    </Tooltip>
                    <Tooltip title="List view">
                      <button
                        className={`${styles.viewBtn} ${viewMode === "list" ? styles.active : ""}`}
                        onClick={() => setView("list")}
                        aria-label="List view"
                      >
                        <ViewListIcon sx={{ fontSize: 18 }} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Error */}
              {isError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Failed to load products. Please check your connection and try again.
                </Alert>
              )}

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className={styles.productGrid}>
                  {isLoading
                    ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                      ))
                    : products.length > 0
                    ? products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                    : !isError && <EmptyState />}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className={styles.productList}>
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <ListCardSkeleton key={i} />
                      ))
                    : products.length > 0
                    ? products.map((product) => (
                        <ShopListCard key={product.id} product={product} />
                      ))
                    : !isError && <EmptyState />}
                </div>
              )}

              {/* Pagination — connected to real API page param */}
              {!isLoading && products.length > 0 && (
                <div className={styles.paginationWrap}>
                  <Pagination
                    count={safeTotalPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#374151",
                        border: "1px solid #e5e7eb",
                        borderRadius: "4px",
                      },
                      "& .Mui-selected": {
                        bgcolor: "#2b6b6b !important",
                        color: "#fff !important",
                        borderColor: "#2b6b6b !important",
                      },
                      "& .MuiPaginationItem-root:hover": {
                        bgcolor: "#f0f9f9",
                        borderColor: "#2b6b6b",
                        color: "#2b6b6b",
                      },
                    }}
                  />
                </div>
              )}
            </div>
            {/* end main area */}

          </div>
        </div>
      </div>
    </main>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className={styles.emptyState}>
    <div className={styles.emptyIcon}>🛒</div>
    <p className={styles.emptyTitle}>No products found</p>
    <p className={styles.emptyText}>Try adjusting your sort options or check back later.</p>
  </div>
);

// ─── List Card Skeleton ───────────────────────────────────────────────────────
const ListCardSkeleton = () => (
  <Box sx={{ display: "flex", gap: 3, p: 2, bgcolor: "#fff", border: "1px solid #f0f0f0", borderRadius: 1 }}>
    <Skeleton variant="rectangular" width={160} height={160} sx={{ flexShrink: 0, borderRadius: 1 }} />
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="25%" height={24} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width={140} height={40} sx={{ borderRadius: 1 }} />
    </Box>
  </Box>
);

export default Shop;

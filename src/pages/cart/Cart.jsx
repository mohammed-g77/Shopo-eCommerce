import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import useCart from '../../hooks/useCart';
import authAxiosInstance from '../../api/authAxiosInstance';
import Newsletter from '../../components/Newsletter';
import styles from './Cart.module.css';

const SHIPPING_OPTIONS = [
  { id: 'free', label: 'Free Shipping', price: 0 },
  { id: 'flat', label: 'Flat Rate', price: 10 },
  { id: 'local', label: 'Local Pickup', price: 5 },
];

export default function Cart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: cartItems, isLoading, isError } = useCart();
  const [shipping, setShipping] = useState('free');
  const [discountCode, setDiscountCode] = useState('');

  const items = useMemo(() => cartItems || [], [cartItems]);

  
  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = item?.product || item;
        const price = product?.price || 0;
        const qty = item?.quantity || 1;
        return sum + price * qty;
      }, 0),
    [items],
  );

  const shippingCost = SHIPPING_OPTIONS.find((s) => s.id === shipping)?.price ?? 0;
  const total = subtotal + shippingCost;

  
  const removeMutation = useMutation({
    mutationFn: async (cartId) => {
      await authAxiosInstance.delete(`/Carts/${cartId}`);
    },
    onSuccess: () => queryClient.invalidateQueries(['carts']),
  });

  
  const clearMutation = useMutation({
    mutationFn: async () => {
      await authAxiosInstance.delete('/Carts/clear');
    },
    onSuccess: () => queryClient.invalidateQueries(['carts']),
  });

  
  const updateMutation = useMutation({
    mutationFn: async ({ cartId, quantity }) => {
      await authAxiosInstance.patch(`/Carts/${cartId}`, { quantity });
    },
    onSuccess: () => queryClient.invalidateQueries(['carts']),
  });

  const handleQuantityChange = (cartId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    updateMutation.mutate({ cartId, quantity: newQty });
  };

  
  if (isLoading) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.loadingState}>
          <CircularProgress sx={{ color: '#ffbb38' }} />
        </div>
      </div>
    );
  }

  
  if (isError) {
    return (
      <div className={styles.cartPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumbBanner}>
          <div className="container-x">
            <div className={styles.breadcrumbInner}>
              <h1 className={styles.breadcrumbTitle}>Your Cart</h1>
              <div className={styles.breadcrumbTrail}>
                <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
                <span className={styles.breadcrumbSep}>›</span>
                <span className={styles.breadcrumbCurrent}>Cart</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-x">
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2 className={styles.emptyTitle}>Unable to load your cart</h2>
            <p className={styles.emptyText}>
              Please log in to view your cart items, or try refreshing the page.
            </p>
            <Link to="/login" className={styles.emptyShopBtn}>
              Log In
            </Link>
          </div>
        </div>
        <Newsletter />
      </div>
    );
  }

  
  if (items.length === 0) {
    return (
      <div className={styles.cartPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumbBanner}>
          <div className="container-x">
            <div className={styles.breadcrumbInner}>
              <h1 className={styles.breadcrumbTitle}>Your Cart</h1>
              <div className={styles.breadcrumbTrail}>
                <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
                <span className={styles.breadcrumbSep}>›</span>
                <span className={styles.breadcrumbCurrent}>Cart</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-x">
          <div className={styles.emptyState}>
            {/* Cart icon SVG */}
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyText}>
              Looks like you haven't added any products yet. Browse our collection and find something you love!
            </p>
            <Link to="/home" className={styles.emptyShopBtn}>
              Start Shopping
            </Link>
          </div>
        </div>
        <Newsletter />
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      {/* ── Breadcrumb Banner ─────────────────────────── */}
      <div className={styles.breadcrumbBanner}>
        <div className="container-x">
          <div className={styles.breadcrumbInner}>
            <h1 className={styles.breadcrumbTitle}>Your Cart</h1>
            <div className={styles.breadcrumbTrail}>
              <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cart Content ──────────────────────────────── */}
      <div className="container-x">
        <div className={styles.cartContent}>
          {/* Cart Table */}
          <div className={styles.cartTableWrap}>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const product = item?.product || item;
                  const price = product?.price || 0;
                  const quantity = item?.quantity || 1;
                  const itemTotal = price * quantity;
                  const image = product?.image || product?.imageUrl || product?.mainImage || '';

                  return (
                    <tr key={item.id}>
                      {/* Product */}
                      <td>
                        <div className={styles.productCell}>
                          <img
                            src={image}
                            alt={product?.name || 'Product'}
                            className={styles.productImage}
                          />
                          <div className={styles.productInfo}>
                            <p className={styles.productName}>
                              {product?.name || 'Product Name'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Color */}
                      <td>
                        <div
                          className={styles.colorDot}
                          style={{ backgroundColor: item?.color || '#deb887' }}
                        />
                      </td>

                      {/* Size */}
                      <td>
                        <span className={styles.sizeBadge}>
                          {item?.size || 'Small'}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <span className={styles.price}>${price.toFixed(2)}</span>
                      </td>

                      {/* Quantity */}
                      <td>
                        <div className={styles.qtyControls}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            disabled={quantity <= 1 || updateMutation.isPending}
                            onClick={() => handleQuantityChange(item.id, quantity, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className={styles.qtyValue}>{quantity}</span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            disabled={updateMutation.isPending}
                            onClick={() => handleQuantityChange(item.id, quantity, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Total */}
                      <td>
                        <span className={styles.totalPrice}>${itemTotal.toFixed(2)}</span>
                      </td>

                      {/* Remove */}
                      <td>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeMutation.mutate(item.id)}
                          disabled={removeMutation.isPending}
                          aria-label="Remove item"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Actions Row */}
          <div className={styles.actionsRow}>
            <div className={styles.discountGroup}>
              <input
                type="text"
                className={styles.discountInput}
                placeholder="Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button type="button" className={styles.applyBtn}>
                Apply
              </button>
            </div>

            <div className={styles.actionBtns}>
              {items.length > 0 && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => clearMutation.mutate()}
                  disabled={clearMutation.isPending}
                >
                  {clearMutation.isPending ? 'Clearing…' : 'Clear Cart'}
                </button>
              )}
              <button
                type="button"
                className={styles.continueBtn}
                onClick={() => navigate('/home')}
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Cart Totals Section */}
          <div className={styles.cartTotalsSection}>
            
            <div />

            {/* Cart Totals Card */}
            <div className={styles.cartTotalsCard}>
              <h2 className={styles.cartTotalsTitle}>Cart Totals</h2>

              {/* Subtotal */}
              <div className={styles.totalsRow}>
                <span className={styles.totalsLabel}>Subtotal</span>
                <span className={styles.totalsValue}>${subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className={styles.totalsRow} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 4 }}>
                <span className={styles.totalsLabel}>Shipping</span>
                <div className={styles.shippingRadios}>
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label key={opt.id} className={styles.shippingRadio}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shipping === opt.id}
                        onChange={() => setShipping(opt.id)}
                      />
                      <span>{opt.label}</span>
                      <span className={styles.shippingPrice}>
                        {opt.price === 0 ? 'Free' : `+$${opt.price.toFixed(2)}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className={styles.totalsFinal}>
                <span className={styles.totalsFinalLabel}>Total</span>
                <span className={styles.totalsFinalValue}>${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
                <span className={styles.checkoutBtnArrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter (reused from Home) ─────────────── */}
      <Newsletter />
    </div>
  );
}

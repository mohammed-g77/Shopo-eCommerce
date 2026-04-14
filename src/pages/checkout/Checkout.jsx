import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useCart from '../../hooks/useCart';
import { createCheckout } from '../../api/checkoutService';
import styles from './Checkout.module.css';

const SHIPPING_OPTIONS = [
  { id: 'free', label: 'Free Shipping', desc: 'Delivery in 5–7 business days', price: 0 },
  { id: 'flat', label: 'Flat Rate', desc: 'Delivery in 3–5 business days', price: 10 },
  { id: 'express', label: 'Express Shipping', desc: 'Delivery in 1–2 business days', price: 25 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: cartItems, isLoading, isError } = useCart();
  const [shipping, setShipping] = useState('free');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

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

  const shippingCost =
    SHIPPING_OPTIONS.find((s) => s.id === shipping)?.price ?? 0;

  const total = subtotal + shippingCost;

  const placeOrderMutation = useMutation({
    mutationFn: async (formData) => {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        zipCode: formData.zipCode,
        address: formData.address,
        notes: formData.notes || '',
      };
      const res = await createCheckout(payload);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['carts']);
      setShowSuccess(true);
    },
  });

  const onSubmit = (data) => {
    placeOrderMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className={styles.checkoutPage}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
          <CircularProgress sx={{ color: '#2b6b6b' }} />
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────
  if (isError) {
    return (
      <div className={styles.checkoutPage}>
        <div style={{ textAlign: 'center', paddingTop: 100, color: '#ef262c' }}>
          Failed to load cart data. Please try again later.
        </div>
      </div>
    );
  }

  // ── Empty cart state ───────────────────────────────
  if (items.length === 0) {
    return (
      <div className={styles.checkoutPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumbBanner}>
          <div className="container-x">
            <div className={styles.breadcrumbContent}>
              <h1 className={styles.breadcrumbTitle}>Checkout</h1>
              <div className={styles.breadcrumbTrail}>
                <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
                <span className={styles.breadcrumbSep}>/</span>
                <span className={styles.breadcrumbCurrent}>Checkout</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-x">
          <div className={styles.emptyState}>
            <ShoppingCartOutlinedIcon className={styles.emptyIcon} sx={{ fontSize: 64 }} />
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyText}>
              Add items to your cart before proceeding to checkout.
            </p>
            <Link to="/home" className={styles.emptyBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      {/* ── Breadcrumb Banner ─────────────────────────── */}
      <div className={styles.breadcrumbBanner}>
        <div className="container-x">
          <div className={styles.breadcrumbContent}>
            <h1 className={styles.breadcrumbTitle}>Checkout</h1>
            <div className={styles.breadcrumbTrail}>
              <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <Link to="/cart" className={styles.breadcrumbLink}>Cart</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page Body ─────────────────────────────────── */}
      <div className="container-x">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.checkoutLayout}>
            {/* ── LEFT: Billing Form ───────────────────── */}
            <div>
              {/* Billing Details */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Billing Details</h2>
                <p className={styles.sectionSubtitle}>
                  Please fill in the fields below to complete your order.
                </p>

                <div className={styles.formGrid}>
                  {/* First Name */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-firstName">
                      First Name<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-firstName"
                      type="text"
                      placeholder="John"
                      className={`${styles.formInput} ${errors.firstName ? styles.formInputError : ''}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <span className={styles.errorText}>{errors.firstName.message}</span>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-lastName">
                      Last Name<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-lastName"
                      type="text"
                      placeholder="Doe"
                      className={`${styles.formInput} ${errors.lastName ? styles.formInputError : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <span className={styles.errorText}>{errors.lastName.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-email">
                      Email Address<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      placeholder="you@example.com"
                      className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <span className={styles.errorText}>{errors.email.message}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-phone">
                      Phone Number<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className={`${styles.formInput} ${errors.phone ? styles.formInputError : ''}`}
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && (
                      <span className={styles.errorText}>{errors.phone.message}</span>
                    )}
                  </div>

                  {/* Country */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-country">
                      Country<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <select
                      id="checkout-country"
                      className={`${styles.formSelect} ${errors.country ? styles.formInputError : ''}`}
                      defaultValue=""
                      {...register('country', { required: 'Country is required' })}
                    >
                      <option value="" disabled>Select Country</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="EG">Egypt</option>
                      <option value="JO">Jordan</option>
                      <option value="IN">India</option>
                      <option value="JP">Japan</option>
                    </select>
                    {errors.country && (
                      <span className={styles.errorText}>{errors.country.message}</span>
                    )}
                  </div>

                  {/* State */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-state">
                      State / Region<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-state"
                      type="text"
                      placeholder="California"
                      className={`${styles.formInput} ${errors.state ? styles.formInputError : ''}`}
                      {...register('state', { required: 'State is required' })}
                    />
                    {errors.state && (
                      <span className={styles.errorText}>{errors.state.message}</span>
                    )}
                  </div>

                  {/* City */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-city">
                      City<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      placeholder="Los Angeles"
                      className={`${styles.formInput} ${errors.city ? styles.formInputError : ''}`}
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && (
                      <span className={styles.errorText}>{errors.city.message}</span>
                    )}
                  </div>

                  {/* Zip Code */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="checkout-zipCode">
                      Zip / Postal Code<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-zipCode"
                      type="text"
                      placeholder="90001"
                      className={`${styles.formInput} ${errors.zipCode ? styles.formInputError : ''}`}
                      {...register('zipCode', { required: 'Zip code is required' })}
                    />
                    {errors.zipCode && (
                      <span className={styles.errorText}>{errors.zipCode.message}</span>
                    )}
                  </div>

                  {/* Address */}
                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel} htmlFor="checkout-address">
                      Street Address<span style={{ color: '#ef262c' }}>*</span>
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      placeholder="123 Main Street, Apt 4B"
                      className={`${styles.formInput} ${errors.address ? styles.formInputError : ''}`}
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && (
                      <span className={styles.errorText}>{errors.address.message}</span>
                    )}
                  </div>

                  {/* Order Notes */}
                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel} htmlFor="checkout-notes">
                      Order Notes (optional)
                    </label>
                    <textarea
                      id="checkout-notes"
                      placeholder="Notes about your order, e.g. special delivery instructions"
                      className={styles.formTextarea}
                      {...register('notes')}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Shipping Method</h2>
                <p className={styles.sectionSubtitle}>
                  Select your preferred shipping option.
                </p>

                <div className={styles.shippingOptions}>
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`${styles.shippingOption} ${shipping === opt.id ? styles.shippingOptionActive : ''}`}
                      htmlFor={`shipping-${opt.id}`}
                    >
                      <input
                        type="radio"
                        id={`shipping-${opt.id}`}
                        name="shippingMethod"
                        className={styles.shippingRadio}
                        checked={shipping === opt.id}
                        onChange={() => setShipping(opt.id)}
                      />
                      <div className={styles.shippingOptionInfo}>
                        <div className={styles.shippingOptionLabel}>{opt.label}</div>
                        <div className={styles.shippingOptionDesc}>{opt.desc}</div>
                      </div>
                      <div className={styles.shippingOptionPrice}>
                        {opt.price === 0 ? 'Free' : `+$${opt.price.toFixed(2)}`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ─────────────────── */}
            <div>
              <div className={styles.orderSummary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>

                {/* Cart items list */}
                <div>
                  {items.map((item) => {
                    const product = item?.product || item;
                    const price = product?.price || 0;
                    const qty = item?.quantity || 1;
                    const image =
                      product?.image || product?.imageUrl || product?.mainImage || '';

                    return (
                      <div key={item.id} className={styles.summaryItem}>
                        <img
                          src={image}
                          alt={product?.name || 'Product'}
                          className={styles.summaryItemImage}
                        />
                        <div className={styles.summaryItemDetails}>
                          <div className={styles.summaryItemName}>
                            {product?.name || 'Product'}
                          </div>
                          <div className={styles.summaryItemMeta}>
                            Qty: {qty}
                            {item?.size ? ` · ${item.size}` : ''}
                          </div>
                        </div>
                        <div className={styles.summaryItemPrice}>
                          ${(price * qty).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className={styles.summaryTotals}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryRowLabel}>Subtotal</span>
                    <span className={styles.summaryRowValue}>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryRowLabel}>Shipping</span>
                    <span className={styles.summaryRowValue}>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <hr className={styles.summaryDivider} />

                  <div className={styles.summaryTotal}>
                    <span className={styles.summaryTotalLabel}>Total</span>
                    <span className={styles.summaryTotalValue}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place order */}
                <button
                  type="submit"
                  className={styles.placeOrderBtn}
                  disabled={placeOrderMutation.isPending}
                >
                  {placeOrderMutation.isPending ? (
                    <>
                      <span className={styles.spinner} />
                      Processing…
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                {/* Error message */}
                {placeOrderMutation.isError && (
                  <p style={{ color: '#ef262c', fontSize: 13, marginTop: 12, textAlign: 'center' }}>
                    {placeOrderMutation.error?.message ||
                      'Something went wrong. Please try again.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── Success Modal ─────────────────────────────── */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIconWrap}>
              <CheckCircleOutlineIcon sx={{ fontSize: 42, color: '#fff' }} />
            </div>
            <h2 className={styles.successTitle}>Order Placed Successfully!</h2>
            <p className={styles.successText}>
              Thank you for your purchase. Your order has been received and is now being
              processed. You will receive a confirmation email shortly.
            </p>
            <Link
              to="/home"
              className={styles.successBtn}
              onClick={() => setShowSuccess(false)}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

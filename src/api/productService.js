import axios from 'axios';

const BASE_URL = 'https://knowledgeshop.runasp.net/api';

/**
 * Validates required fields before sending to the API.
 * @param {Object} payload
 * @returns {string|null} error message or null if valid
 */
const validateProductPayload = (payload) => {
  const { translations, price, quantity, categoryId, mainImage } = payload;

  if (!Array.isArray(translations) || translations.length < 2)
    return 'At least two translations (en, ar) are required.';

  for (const t of translations) {
    if (!t.language?.trim())  return 'Each translation must have a language.';
    if (!t.name?.trim())      return `Translation name is required for "${t.language}".`;
    if (!t.description?.trim()) return `Translation description is required for "${t.language}".`;
  }

  if (price === undefined || price === null || price === '')
    return 'Price is required.';
  if (Number(price) < 0)
    return 'Price must be a non-negative number.';
  if (quantity === undefined || quantity === null || quantity === '')
    return 'Quantity is required.';
  if (!categoryId)
    return 'CategoryId is required.';
  if (!(mainImage instanceof File))
    return 'MainImage must be a File object.';

  return null;
};

/**
 * Builds the multipart/form-data body.
 * @param {Object} payload
 * @returns {FormData}
 */
const buildFormData = (payload) => {
  const { translations, price, discount = 0, quantity, categoryId, mainImage } = payload;

  const form = new FormData();

  translations.forEach((t, i) => {
    form.append(`Translations[${i}].language`,    t.language);
    form.append(`Translations[${i}].name`,        t.name);
    form.append(`Translations[${i}].Description`, t.description);
  });

  form.append('Price',      String(price));
  form.append('Discount',   String(discount));
  form.append('Quantity',   String(quantity));
  form.append('CategoryId', String(categoryId));
  form.append('MainImage',  mainImage);

  return form;
};

/**
 * Creates a product via POST /api/admin/Products.
 *
 * @param {Object} payload
 * @param {Array<{language: string, name: string, description: string}>} payload.translations
 * @param {number} payload.price
 * @param {number} [payload.discount=0]
 * @param {number} payload.quantity
 * @param {number} payload.categoryId
 * @param {File}   payload.mainImage
 * @param {string} token  - Bearer token for authorization
 *
 * @returns {Promise<{ success: boolean, status: number, message: string }>}
 */
export const createProduct = async (payload, token) => {
  if (!token) {
    return { success: false, status: 401, message: 'Authorization token is missing.' };
  }

  const validationError = validateProductPayload(payload);
  if (validationError) {
    return { success: false, status: 0, message: validationError };
  }

  const formData = buildFormData(payload);

  const response = await axios.post(
    `${BASE_URL}/admin/Products`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // Axios sets Content-Type: multipart/form-data + boundary automatically
      },
      validateStatus: (status) => status < 500, // resolve for 2xx and 4xx, throw for 5xx
    },
  );

  const isSuccess = response.status >= 200 && response.status < 300;

  return {
    success: isSuccess,
    status: response.status,
    message: isSuccess
      ? 'Product created successfully.'
      : response.data?.message ?? `Request failed with status ${response.status}.`,
  };
};

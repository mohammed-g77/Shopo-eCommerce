import axios from 'axios';

// Using the knowledge shop domain as the base
const BASE_URL = 'https://knowledgeshop.runasp.net/api';

/**
 * Validates the payload for updating a category.
 */
const validateUpdatePayload = (id, translations, token) => {
  if (!token) return 'Authorization token is missing.';
  if (!id) return 'Category ID is required.';
  
  if (!Array.isArray(translations) || translations.length === 0) {
    return 'At least one translation is required.';
  }

  for (const t of translations) {
    if (!t.language?.trim()) return 'Each translation must have a valid language code.';
    if (!t.name?.trim()) return `Translation name is required for language "${t.language}".`;
  }

  return null;
};

/**
 * Helper to validate just an ID and Token
 */
const validateIdAndToken = (id, token) => {
  if (!token) return 'Authorization token is missing.';
  if (!id) return 'Category ID is required.';
  return null;
};

/**
 * Gets all categories for Admin view.
 * 
 * @param {string} token 
 * @returns {Promise<{ success: boolean, status: number, data?: any, message: string }>}
 */
export const getAllAdminCategories = async (token) => {
  if (!token) return { success: false, status: 0, message: 'Authorization token is missing.' };

  try {
    const response = await axios.get(
      `${BASE_URL}/admin/Categories`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        validateStatus: (status) => status < 500,
      }
    );

    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      data: isSuccess ? response.data : null,
      message: isSuccess 
        ? 'Categories fetched successfully.' 
        : `Failed to fetch categories. API returned status ${response.status}.`,
    };
  } catch (error) {
    console.error('Get all categories error:', error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred while fetching categories.',
    };
  }
};

/**
 * Deletes a category.
 * 
 * @param {number|string} categoryId 
 * @param {string} token 
 * @returns {Promise<{ success: boolean, status: number, message: string }>}
 */
export const deleteCategory = async (categoryId, token) => {
  const validationError = validateIdAndToken(categoryId, token);
  if (validationError) return { success: false, status: 0, message: validationError };

  try {
    const response = await axios.delete(
      `${BASE_URL}/admin/Categories/${categoryId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        validateStatus: (status) => status < 500,
      }
    );

    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      message: isSuccess 
        ? 'Category deleted successfully.' 
        : `Failed to delete category. API returned status ${response.status}.`,
    };
  } catch (error) {
    console.error('Delete category error:', error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred while deleting category.',
    };
  }
};

/**
 * Updates a category's basic details (translations).
 * 
 * @param {number|string} categoryId 
 * @param {Array<{name: string, language: string}>} translations 
 * @param {string} token 
 * @returns {Promise<{ success: boolean, status: number, message: string }>}
 */
export const updateCategory = async (categoryId, translations, token) => {
  const validationError = validateUpdatePayload(categoryId, translations, token);
  
  if (validationError) {
    return { success: false, status: 0, message: validationError };
  }

  try {
    const payload = { translations };
    
    const response = await axios.patch(
      `${BASE_URL}/admin/Categories/${categoryId}`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        validateStatus: (status) => status < 500, 
      }
    );

    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      message: isSuccess 
        ? 'Category updated successfully.' 
        : `Failed to update category. API returned status ${response.status}.`,
    };
  } catch (error) {
    console.error('Update category error:', error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred during update.',
    };
  }
};

/**
 * Toggles the activate/deactivate status of a category.
 * 
 * @param {number|string} categoryId 
 * @param {string} token 
 * @returns {Promise<{ success: boolean, status: number, message: string }>}
 */
export const toggleCategoryStatus = async (categoryId, token) => {
  const validationError = validateIdAndToken(categoryId, token);
  
  if (validationError) {
    return { success: false, status: 0, message: validationError };
  }

  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/Categories/toggle-status/${categoryId}`,
      {}, // empty body
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        validateStatus: (status) => status < 500,
      }
    );

    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      message: isSuccess 
        ? 'Category status toggled successfully.' 
        : `Failed to toggle status. API returned status ${response.status}.`,
    };
  } catch (error) {
    console.error('Toggle status error:', error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred while toggling status.',
    };
  }
};

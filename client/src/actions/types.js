export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export function fetchProductsPending() {
  return {
      type: FETCH_PRODUCTS_PENDING
  }
}

export  function fetchProductsSuccess(products) {
  console.log('in2');
  console.log(products);
  return {
      type: FETCH_PRODUCTS_SUCCESS,
      products: products
  }
}

export function fetchProductsError(error) {
  return {
      type: FETCH_PRODUCTS_ERROR,
      error: error
  }
}
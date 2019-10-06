import {FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR} from '../actions/types';

const initialState = {
    pending: false,
    products: [],
    error: null
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_PRODUCTS_SUCCESS:
          console.log('in3');
          console.log(action.products);
          return Object.assign({}, state, {
            products: state.products.concat(action.products)
          });
        
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getProducts = state => state.products;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
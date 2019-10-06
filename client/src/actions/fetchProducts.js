import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from './types';
import axios from "axios";

function fetchProducts() {
    return dispatch => {
        //dispatch(fetchProductsPending());
        axios.get("/api/products/")
        //.then(res => res.json())
        .then(res => {
            if(res.error) {
              console.log('hid');
                throw(res.error);
            }
            console.log(res.data.products);
            //alert('hi');
            dispatch(fetchProductsSuccess(res.data.products));
            //return res.products;
        })
        .catch(error => {
          console.log('hfgid');
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;
import React, { Component, Fragment } from "react";
//import { render } from "react-dom";
//import request from "superagent";
import axios from "axios";
import debounce from "lodash.debounce";


export default class Mylist extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      products: [],
      pagenum:0
    };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadProducts,
        state: {
          error,
          isLoading,
          hasMore,
          pagenum
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadProducts(this.state.pagenum);
      }
    }, 100);
  }

  componentWillMount() {
    // Loads some products on initial load
    this.loadProducts(this.state.pagenum);
  }

  loadProducts = (counter=1) => {
    console.log('ab'+counter);
    counter=counter+1;
    this.setState({ isLoading: true }, () => {
      axios.get("http://localhost:5000/api/products/?pagenum="+counter)
        .then((results) => {
          console.log(results);
          // Creates a massaged array of product data
          const nextProduct = results.data.result.docs.map(product => ({
            name: product.name,
            photo: product.image,
            price: product.price
          }));
          const hasMoreData=results.data.result.hasNextPage;
          const pagenum=results.data.result.page;

          // Merges the next products into our existing products
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: hasMoreData,
            pagenum:pagenum,
            isLoading: false,
            products: [
              ...this.state.products,
              ...nextProduct,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      products,
    } = this.state;

    return (
      <div>
        <h3>Products</h3>
        <p>Scroll down to load more!!</p>
        {products.map(product => (
          <Fragment key={product.name}>
            <hr />
            <div style={{ display: 'flex' }}>
              <img
                alt={product.name}
                src={product.photo}
                style={{
                  borderRadius: '50%',
                  height: 72,
                  marginRight: 20,
                  width: 72,
                }}
              />
              <div>
                <h4 style={{ marginTop: 0 }}>
                  {product.name}
                </h4>
                <p>Price: {product.price.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR'
})}</p>
                
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>You did it! You reached the end!</div>
        }
      </div>
    );
  }
}

// const container = document.createElement("div");
// document.body.appendChild(container);
// render(<Mylist />, container);
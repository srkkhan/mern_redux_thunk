import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import fetchProducts from '../../actions/fetchProducts';
import {getProductsError, getProducts, getProductsPending} from '../../reducers/authReducer';

//const Products = ({products, error, pending})=>(
export class Products extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.fetchProducts();
  }

    render() {
        const {products, error, pending} = this.props;
          return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
              <div className="row">
                <div className="col s12 center-align">
                  <h4>
                    <b>Build</b> a login/auth app with the{" "}
                    <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
                    scratch
                  </h4>
                  <p className="flow-text grey-text text-darken-1">
                    Products will come here
                    {console.log(products)}
                    {console.log(this.props.products)}
                    {console.log(this.state)}
                    {console.log(this.props)}
                  </p>
                  <br />
                  <div className="col s6">
                    <Link
                      to="/register"
                      style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                      }}
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Register
                    </Link>
                  </div>
                  <div className="col s6">
                    <Link
                      to="/login"
                      style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                      }}
                      className="btn btn-large btn-flat waves-effect white black-text"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        
    }
}
//);

const mapStateToProps = state => ({
    error: getProductsError(state),
    products: getProducts(state),
    pending: getProductsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

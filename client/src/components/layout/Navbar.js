import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav class="navbar navbar-inverse">
          <ul class="nav navbar-nav">
            <li>
            <Link 
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              
            >Home
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              style={{
                fontFamily: "monospace"
              }}
              
            >Products
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              style={{
                fontFamily: "monospace"
              }}
              
            >AboutUS
            </Link>
          </li>

          <li>
            <Link
              to="/faqs"
              style={{
                fontFamily: "monospace"
              }}
              
            >FAQs
            </Link>
          </li>

          </ul>
         
        </nav>
        
      </div>
    );
  }
}

export default Navbar;

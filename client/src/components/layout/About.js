import React, { Component } from "react";
//import { render } from "react-dom";
//import request from "superagent";
//import axios from "axios";
//import debounce from "lodash.debounce";


export default class About extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      aboutText:""
    };
  }

  handleChange(e) {
    console.log(e);
    this.setState({ [e.target.name] : e.target.value });
 }

  render() {
    

      return (
        <div class="container">
  <p>Write AboutUS Content</p>
  <div class="row">
    <div class="col-sm-3" >
    <textarea placeholder="Write AboutUS here!!" name="aboutText" value={this.state.aboutText} onChange={this.handleChange.bind(this)} />
    </div>
    <div class="col-sm-3" >
      <p>{this.state.aboutText}</p>
    </div>
  </div>
</div>
      );
    
  }
}
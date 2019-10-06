import React, { Component } from "react";
//import { render } from "react-dom";
//import request from "superagent";
import axios from "axios";
//import debounce from "lodash.debounce";


export default class Faq extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      id:props.faq.id,
      editing:false,
      question:props.faq.question,
      answer:props.faq.answer
    };
  }

  editFaq = () => {
    this.setState({ editing: true });
  }

  deleteFaq = () => {
    this.setState({ editing: true });
  }

  handleChange(e) {
    console.log(e);
    this.setState({ [e.target.name] : e.target.value });
 }

 saveFaq(id){
  axios.put('http://localhost:5000/api/faqs/faqs/'+id,{
    question:this.state.question,
    answer:this.state.answer
  })
  .then(response => {
    this.setState({ editing: false });
    this.render();
  });
}
  

  render() {
    console.log(this.state);
    if(this.state.editing){
      return (
        <div key={this.props.faq.seqNum+1}>
           <textarea name="question" value={this.state.question} onChange={this.handleChange.bind(this)} />
           <textarea name="answer" value={this.state.answer} onChange={this.handleChange.bind(this)} />
        <p>{this.props.faq.seqNum+1}</p>
          <button value="Edit" onClick={() => this.saveFaq(this.props.faq.id)}>{(this.state.editing)?"Save":"Edit"}</button>
        </div>
      );
    }else{
      return (
        <div key={this.props.faq.seqNum+1}>
        <b>{this.props.faq.seqNum+1}. {this.state.question}</b>
          <p>{this.state.answer}</p>
          <button value="Edit" onClick={() => this.editFaq(this.props.faq.id)} >
            {(this.state.editing)?"Save":"Edit"}
          </button>
          <button value="Delete" onClick={()=>this.props.deleteFaq(this.props.faq.id)} >
            Delete
          </button>
        </div>
      );
    }
  }
}
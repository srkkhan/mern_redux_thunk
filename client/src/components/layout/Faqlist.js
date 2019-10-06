import React, { Component, Fragment } from "react";
//import { render } from "react-dom";
//import request from "superagent";
import axios from "axios";
//import debounce from "lodash.debounce";
import Faq from "./Faq";

export default class Faqlist extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      faqLoading: false,
      faqs: [],
      newQuestion:"",
      newAnswer:""
    };
    this.deleteFaq = this.deleteFaq.bind(this);
    this.addFaq = this.addFaq.bind(this)
    this.addFaqs = this.addFaqs.bind(this)
    this.saveFaq = this.saveFaq.bind(this)
  }

  componentWillMount() {
    // Loads some products on initial load
    this.loadFaqs();
  }

  saveFaq(){
    let oldFaqs=this.state.faqs;
    let newQuestion=this.state.newQuestion;
    let newAnswer=this.state.newAnswer;
    oldFaqs.push({
      question:newQuestion,
      answer:newAnswer
    });
    console.log(oldFaqs);
    this.setState({
      faqs:oldFaqs
    });

    this.addFaqs();
  }

  addFaq(e){
    this.setState({
        [e.target.name] : e.target.value
    });
  }

  deleteFaq(id){
    var array = [...this.state.faqs]; // make a separate copy of the array
    var index = array.findIndex(a=> a.id === id);
    if (index > -1) {
      array.splice(index, 1);
    }
    console.log(array);
    axios.delete('http://localhost:5000/api/faqs/faqs/'+id)
    .then(response => {
      console.log(this.result);
      this.setState({faqs:array});
      this.render();
    });
    
  }
  
  addFaqs(){
    console.log("update");
    let totCnt=this.state.faqs.length;
    this.setState({ faqLoading: true }, () => {
      axios.post("http://localhost:5000/api/faqs/faqs",{
        question:this.state.newQuestion,
        answer:this.state.newAnswer
      }).then((results) => {
          console.log(results);
          // Creates a massaged array of product data
          const nextFaq = [{
            seqNum: totCnt,
            id:results.data._id,
            question: results.data.question,
            answer: results.data.answer
          }];
          
          // Merges the next products into our existing products
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            faqLoading: false,
            newQuestion:"",
            newAnswer:"",
            faqs: [
              ...this.state.faqs,
              ...nextFaq,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            faqLoading: false,
           });
        })
    });
  }

  loadFaqs = () => {
    console.log("check");
    this.setState({ faqLoading: true }, () => {
      axios.get("http://localhost:5000/api/faqs/faqs")
        .then((results) => {
          console.log(results);
          // Creates a massaged array of product data
          const nextFaq = results.data.map((faq,index) => ({
            seqNum: index,
            id:faq._id,
            question: faq.question,
            answer: faq.answer
          }));
          
          // Merges the next products into our existing products
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            faqLoading: false,
            faqs: [
              ...this.state.faqs,
              ...nextFaq,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            faqLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      faqLoading,
      faqs,
    } = this.state;

    return (
      <div>
        
        {faqs.map(faq => (
          <Fragment key={faq.id} >
            <hr />
            <div style={{ display: 'flex' }}>
              <Faq faq={faq} deleteFaq={this.deleteFaq} />
            </div>
          </Fragment>
        ))}
        <hr />
        <form >
          <b>Enter New FAQ here</b><br/>
        <label>
          <b>Question</b>
          <textarea name="newQuestion" value={this.state.newQuestion} onChange={this.addFaq} />
        </label>
        <label>
          <b>Answer</b>
          <textarea name="newAnswer" value={this.state.newAnswer} onChange={this.addFaq} />
        </label>
        <input type="button" value="Insert" onClick={() => this.addFaqs()} />
      </form>
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {faqLoading &&
          <div>Loading...</div>
        }
        
      </div>
    );
  }
}

// const container = document.createElement("div");
// document.body.appendChild(container);
// render(<Mylist />, container);
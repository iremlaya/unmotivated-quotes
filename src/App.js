/* global chrome */
import React from 'react';
import './App.css';
import firebase from "firebase/app"
import config from "./config/fbConfig";
import "firebase/firestore"
import "firebase/auth"
import { DH_CHECK_P_NOT_PRIME } from 'constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    firebase.initializeApp(config); 
    this.db = firebase.firestore();
    
    this.state = {
      quote:  {},
      isLoading: true
    }
    this.quotes = [
      {
        text: 'The first step towards failure is trying.',
        source: {
          displayName: 'Gecko & Fly',
          url: 'https://www.geckoandfly.com/18885/unmotivated-quotes-friends-enemies-overconfident/'
        },
        backgroundImage: 'https://images.unsplash.com/photo-1488426314888-94c9164df81d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        backgroundGradient: ['#8a7967', '#caccd1']
      },
      {
        text: 'Tsdbbksking.',
        source: {
          displayName: 'Gecko & Fly',
          url: 'https://www.geckoandfly.com/18885/unmotivated-quotes-friends-enemies-overconfident/'
        },
        backgroundImage: 'https://images.unsplash.com/photo-1488426314888-94c9164df81d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        backgroundGradient: ['#8a7967', '#caccd1']
      },
    ]
  }
  componentDidMount() {
    this.getUserData();
    
    //this.addQuote();
   

  }

  handleRefresh = () => {
    console.log("Refreshed!")
    chrome.tabs.reload()
  }

  handleSubmit = () => {
    console.log("Submitted!")
  }
  addQuote = () => {
    let ref = this.db.collection("quotes")
    this.quotes.map((q) => {
      
      ref.add(q)
    })
  }
  getUserData = () => {
  
    firebase.firestore().collection('quotes').get()
    .then((snapshot) => {
      let len = snapshot.size
      let random = Math.floor(Math.random() * (len - 1));
      this.setState({
        quote: snapshot.docs[random].data(), isLoading: false
      })
      console.log(this.state.quote.source.url)
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  }
  render() {
    return (
      this.state.isLoading ? <div></div> : 
      <div className="App" style={{
        backgroundImage: `url(${this.state.quote.backgroundImage})`
      }}>
        <div className="container">
          <div className="header">
            <div className="right">
              <button onClick={this.handleRefresh} className="refresh">
              </button>
              <button onClick={this.handleSubmit} className="submit">Submit</button>
            </div>
          </div>
          <div className="quote-body">
            <div className="quote">
              {this.state.quote.text}
            </div>
            <div className="source">
              <a href={this.state.quote.source.url}>-{this.state.quote.source.displayName}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

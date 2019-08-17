import React from 'react';
import './App.css';
import firebase from "firebase/app"
import config from "./config/fbConfig";
import "firebase/firestore"
import "firebase/auth"
import SubmitForm from "./components/submitForm"

class App extends React.Component {

  constructor(props) {
    super(props);
    firebase.initializeApp(config); 
    this.db = firebase.firestore();
    
    this.state = {
      quote:  {},
      isLoading: true,
      isSubmitFormOpen: false
    }
    
  }
  componentDidMount() {
    this.getUserData();
    
    //this.addQuote();
   

  }

  handleRefresh = () => {
    this.getUserData();
  }

  handleSubmit = () => {
    this.setState({
      isSubmitFormOpen: true
    })
    
  }
  addQuote = () => {
    let ref = this.db.collection("quotes")
    //this.quotes.map((q) => {
    //  return ref.add(q)
    //})
    console.log(this.state.quote)
    ref.add(this.state.quote)
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

  closeModal = () => {
    this.setState({
      isSubmitFormOpen: false
    })
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
              <form></form>
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
        {this.state.isSubmitFormOpen && <SubmitForm 
        show={this.state.isSubmitFormOpen}
        onClose={this.closeModal}
        submitData={async data =>  {
          await this.setState({
            quote:data
          });
          this.addQuote()

          /* OR:
          componentDidUpdate(prevProps, prevState) {
            if (this.state.value > prevState.value) {
              this.foo();  
            }
          }
           */
        }}
        />}
        
      </div>
    );
  }
}

export default App;

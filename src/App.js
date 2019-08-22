import React from 'react';
import './App.css';
import firebase from "firebase/app"
import config from "./config/fbConfig";
import "firebase/firestore"
import "firebase/auth"
import SubmitForm from "./components/submitForm"
import Unsplash from 'unsplash-js';
import uns from "./tokens/unsplash";

const unsplash = new Unsplash({
  applicationId: uns.applicationId,
  secret: uns.secret
});


class App extends React.Component {

  constructor(props) {
    super(props);
    firebase.initializeApp(config); 
    this.db = firebase.firestore();
    
    this.state = {
      quote:  {},
      backgroundImage: {},
      isLoading: true,
      isSubmitFormOpen: false
    }
    
  }
  componentDidMount() {
    //this.addBackgroundfromUnsplash()
    this.getUserData();
  }

  handleRefresh = () => {
    this.getUserData();
  }

  handleSubmit = () => {
    this.setState({
      isSubmitFormOpen: true
    })
    
  }

  addBackgroundfromUnsplash = () => {
    let refb = this.db.collection("backgrounds")
    var i = 0
    for(i; i<15; i++){
      unsplash.photos.getRandomPhoto({width:1920, height:1080, query:"nature wallpaper",})
      .then(a => a.json())
      .then(json =>
        refb.add({bg: json.urls.regular}))
      
    }
    
  }
  addQuote = () => {
    let ref = this.db.collection("quotes")
    
    //this.quotes.map((q) => {
    //  return ref.add(q)
    //})
    console.log(this.state.quote)
    ref.add(this.state.quote)
    
  }
  getUserData = async () => {
      await this.getQuotes()
      await this.getBackground()
      this.setState({
        isLoading: false
      })
    
      console.log(this.state.quote)
  
  }
  getQuotes = async () => {
    firebase.firestore().collection('quotes').get()
    .then(async (snapshot) => {
      let len = snapshot.size
      let random = Math.floor(Math.random() * (len - 1));
      await this.setState({
        quote: snapshot.docs[random].data()
      })})
      .catch((err) => {
        console.log('Error getting quotes', err);
      });
  }

  getBackground = async () => {
    firebase.firestore().collection('backgrounds').get()
    .then((snapshot) => {
      let len = snapshot.size
      let random = Math.floor(Math.random() * (len - 1));
      this.setState({
        backgroundImage: snapshot.docs[random].data()
      })})
      .catch((err) => {
        console.log('Error getting images', err);
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
        backgroundImage: `url(${this.state.backgroundImage.bg})`
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
              <a href={this.state.quote.sourceUrl}>-{this.state.quote.sourceName}</a>
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

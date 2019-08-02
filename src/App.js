import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quote: {
        text: 'The first step towards failure is trying.',
        source: {
          displayName: 'Gecko & Fly',
          url: 'https://www.geckoandfly.com/18885/unmotivated-quotes-friends-enemies-overconfident/'
        },
        backgroundImage: 'https://images.unsplash.com/photo-1488426314888-94c9164df81d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        backgroundGradient: ['#8a7967', '#caccd1']
      },
    }
  }

  handleRefresh = () => {
    console.log("Refreshed!")
  }

  handleSubmit = () => {
    console.log("Submitted!")
  }

  render() {
    return (
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

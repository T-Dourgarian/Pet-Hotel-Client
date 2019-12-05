import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    mode: false,
  }

  handleClick = () => {
    this.setState({
      mode: !this.state.mode
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Pet Hotel</h1>
        </header>
      </div>
    );
  }
}

export default App;

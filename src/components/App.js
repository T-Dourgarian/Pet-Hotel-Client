import React, { Component } from 'react';
import './App.css';
import Owner from './Owners/Owners';

// component imports
import PetForm from './PetForm/PetForm';

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
        <div className="content-container">
          <div className="nav-buttons">
            <button onClick={this.handleClick}>Dashboard</button>
            <button onClick={this.handleClick}>Manage Owners</button>
          </div>
          {!this.state.mode &&
            <>
              <PetForm />
              {/* pet form component here
          pet table component here */}
            </>
          }
          {this.state.mode &&
            <>
              {/* owner form component here
          owner table component here */}
            </>
          }
        </div>
      </div>
    );
  }
}

export default App;

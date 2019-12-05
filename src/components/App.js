import React, { Component } from 'react';
import './App.css';

// component imports
import PetForm from './PetForm/PetForm';
import Owners from './Owners/Owners';
import PetTable from './PetTable/PetTable'

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
              <PetTable />
            </>
          }
          {this.state.mode &&
            <>
              <Owners />
            </>
          }
        </div>
      </div>
    );
  }
}

export default App;

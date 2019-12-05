import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PetForm.css'

export class PetForm extends Component {
    state = {
        pet: {
            name: '',
            color: '',
            breed: '',
            owner: '',
        }
    }

    handleChange = (prop, event) => {
        this.setState({
            pet: {
                ...this.state.pet,
                [prop]: event.target.value
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({type: 'ADD_PET', payload: this.state.pet})
    }

    render() {
        return (
            <>
            <h2>Add Pet</h2>
            <div className="pet-form-inputs">
                <input onChange={(event) => this.handleChange('name', event)} placeholder="Pet Name"/>
                <input onChange={(event) => this.handleChange('color', event)} placeholder="Pet Color"/>
                <input onChange={(event) => this.handleChange('breed', event)} placeholder="Pet Breed"/>
                <select>
                    {/* map through owner names from DB to populate <option></option>'s */}
                </select>
                <button onClick={this.handleClick}>Submit</button>
            </div>
            </>
        )
    }
}

export default connect()(PetForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PetForm.css'

export class PetForm extends Component {
    state = {
        pet: {
            name: '',
            color: '',
            breed: '',
            owner_id: '',
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_OWNERS' })
        setTimeout(() => {
            this.setState({
                pet: {
                    ...this.state.pet,
                    owner_id: this.props.ownersReducer[0].id
                }
            })
        }, 2000)
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
        this.props.dispatch({ type: 'ADD_PET', payload: this.state.pet })
    }

    render() {
        return (
            <>
                <h2>Add Pet</h2>
                <div className="pet-form-inputs">
                    <input onChange={(event) => this.handleChange('name', event)} placeholder="Pet Name" />
                    <input onChange={(event) => this.handleChange('color', event)} placeholder="Pet Color" />
                    <input onChange={(event) => this.handleChange('breed', event)} placeholder="Pet Breed" />
                    <select onClick={(event) => this.handleChange('owner_id', event)}>
                        {/* map through owner names from DB to populate <option></option>'s */}
                        {this.props.ownersReducer.map((owner) =>
                            <option value={owner.id}>{owner.name}</option>
                        )}
                    </select>
                    <button onClick={this.handleClick}>Submit</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = state => {
    return state;
}

export default connect(mapReduxStateToProps)(PetForm);

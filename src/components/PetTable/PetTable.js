import React, { Component } from 'react'
import { connect } from 'react-redux';

import OwnerName from '../OwnerName/OwnerName'
import axios from 'axios';

export class PetTable extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PETS' });
    }

    handleUpdate = (id) => {
        axios.put(`/api/pets/${id}`)
            .then( () => {
                this.props.dispatch({ type: 'GET_PETS' });
            })
    }

    render() {
        return (
            <div>
                <h3>History</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Pet</th>
                            <th>Breed</th>
                            <th>Color</th>
                            <th>Checked In</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Chris</td>
                            <td>Charlie</td>
                            <td>Shih-tzu</td>
                            <td>Black</td>
                            <td>No</td>
                            <td><button>Delete</button> || <button>Check In </button></td>
                        </tr>
                        {this.props.reduxState.petsReducer[0] && this.props.reduxState.petsReducer.map((pet) => (
                            <tr key={pet.id}>
                                {/* <td>{pet.owner_id}</td> */}
                                <OwnerName id={pet.owner_id}/>
                                <td>{pet.name}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.color}</td>
                                {pet.checked_in === null && <td>No</td>}
                                {pet.checked_in != null && <td>{new Date(pet.updated_at).getDate()}-{new Date(pet.updated_at).getMonth()}-{new Date(pet.updated_at).getFullYear()}</td>}
                                <td><button>Delete</button> || <button onClick={() => this.handleUpdate(pet.id)}>Check In </button></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <pre>{JSON.stringify(this.props.reduxState.petsReducer, null, 2)}</pre>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(PetTable);

import React, { Component } from 'react'
import { connect } from 'react-redux';

export class PetTable extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PETS' });
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
                                <td>{pet.owner}</td>
                                <td>{pet.pet}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.color}</td>
                                <td>{pet.check}</td>
                                <td><button>Delete</button> || <button>Check In </button></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                {/* <pre>{JSON.stringify(this.props.reduxState.petsReducer[0], null, 2)}</pre> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(PetTable);

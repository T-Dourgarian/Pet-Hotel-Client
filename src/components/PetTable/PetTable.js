import React, { Component } from 'react'
import { connect } from 'react-redux';

export class PetTable extends Component {
    
    render() {
        return (
            <div>
                <h3>History</h3>
                <table>
                    <th>
                        <tr>
                            <th>Owner</th>
                            <th>Pet</th>
                            <th>Breed</th>
                            <th>Color</th>
                            <th>Checked In</th>
                            <th>Actions</th>
                        </tr>
                    </th>
                    <tb>
                        <tr>
                            <td>Chris</td>
                            <td>Charlie</td>
                            <td>Shih-tzu</td>
                            <td>Black</td>
                            <td>No</td>
                            <td><button>Delete</button> || <button>Check In </button></td>
                        </tr>
                        {/* {this.props.petsReducer.map((pet) => (
                            <tr key={pet.id}>
                                <td>{pet.owner}</td>
                                <td>{pet.pet}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.color}</td>
                                <td>{pet.check}</td>
                                <td><button>Delete</button> || <button>Check In </button></td>
                            </tr>
                        )
  )} */}
                    </tb>
                </table>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(PetTable);

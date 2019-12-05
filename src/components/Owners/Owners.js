import React, { Component } from 'react'
import { connect } from 'react-redux';

export class OwnerForm extends Component {
    state = {
        name: '',
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Add Owner</h2>
                </div>
                <div>
                    <input
                        onChange={(event) => { this.setState({ name: event.target.value }) }}
                        value={this.state.name}
                    />
                    <button
                        onClick={() => { this.props.dispatch({ type: 'ADD_OWNER', payload: this.state.name }) }}
                    >Add Owner</button>
                </div>

                <div>
                    <table>
                        <thead>
                            <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        # of Pets
                                    </th>
                                    <th>
                                        action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* this.props.owners.map((owner,i) => 
                                    <tr key={i}>
                                        <td>
                                            owner.name
                                        </td>
                                        <td>
                                            owner.numberOfPets
                                        </td>
                                        <td>
                                            <button>delete</button>
                                        </td>
                                    </tr>) */}
                                <tr>
                                    <td>
                                        Thomas
                                    </td>
                                    <td>
                                        0
                                    </td>
                                    <td>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(OwnerForm);

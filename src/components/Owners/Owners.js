import React, { Component } from 'react'
import { connect } from 'react-redux';

import Count from '../Count/Count'

export class OwnerForm extends Component {
    state = {
        name: '',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_OWNERS' })
    }

    handleDelete = (id) => {
        this.props.dispatch({type: 'DELETE_OWNER', payload: id})
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
                                {this.props.reduxState.ownersReducer && this.props.reduxState.ownersReducer.map((owner, i) => 
                                    <tr key={i}>
                                        <td>
                                            {owner.name}
                                        </td>
                                        <Count id={owner.id}/>
                                        <td>
                                            <button onClick={() => this.handleDelete(owner.id)}>delete</button>
                                        </td>
                                    </tr>
                                )}
                                {/* <tr>
                                    <td>
                                        Thomas
                                    </td>
                                    <td>
                                        0
                                    </td>
                                    <td>
                                        <button>Delete</button>
                                    </td>
                                </tr> */}
                            </tbody>
                        </thead>
                    </table>
                </div>
                {JSON.stringify(this.props.reduxState.ownersReducer.data, null, 2)}
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(OwnerForm);

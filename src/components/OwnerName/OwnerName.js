import React, { Component } from 'react'
import axios from 'axios'

export class OwnerName extends Component {
    state = {
        name: '',
    }

    componentDidMount() {
        if (this.state.name === '') {
            axios.get(`/api/owners/${this.props.id}`)
                .then((response) => {
                    // console.log('OWNER NAME', response.data.data[0].name);

                    this.setState({
                        name: response.data.data[0].name
                    })
                })
        }
    }

    render() {
        return (
            <td>
                {this.state.name}
            </td>
        )
    }
}

export default OwnerName
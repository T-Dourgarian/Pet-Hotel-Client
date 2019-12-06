import React, { Component } from 'react'
import axios from 'axios'

export class Count extends Component {
    state = {
        count: null,
    }

    componentDidMount() {
        if (this.state.count === null) {
            axios.get(`/api/count/${this.props.id}`)
                .then((response) => {
                    this.setState({
                        count: response.data.data
                    })
                })
        }
    }

    render() {
        return (
            <td>
                {this.state.count}
            </td>
        )
    }
}

export default Count
import React from 'react'
import './Auth.css'
import AuthWindow from './AuthWindow'

export default class Authorization extends React.Component {

    state = {
        window: 'auth'
    }

    render() {
        if (this.state.window === 'auth') {
            return <AuthWindow openAuth={this.props.openAuth}/>
        }
    }
}
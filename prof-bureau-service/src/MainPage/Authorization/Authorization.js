import React from 'react'
import './Auth.css'
import AuthWindow from './AuthWindow'
import RegWindow from './RegWindow'

export default class Authorization extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        window: 'auth'
    }

    openReg = () => {
        this.setState({
            window: 'reg'
        })
    }

    render() {
        if (this.state.window === 'auth') {
            return <AuthWindow openAuth={this.props.openAuth} openReg={this.openReg}/>
        } else if (this.state.window === 'reg') {
            return <RegWindow />
        }
    }
}
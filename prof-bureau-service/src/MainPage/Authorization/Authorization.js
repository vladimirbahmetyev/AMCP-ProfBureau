import React from 'react'
import './Auth.css'
import AuthWindow from './AuthWindow'
import RegWindow from './RegWindow'

export default class Authorization extends React.Component {

    state = {
        window: 'auth'
    }

    openReg = flag => {
        this.setState({
            window: flag ? 'reg' : 'auth'
        })
    }

    finishReg = () => {
        this.setState({
            window:'auth'
        })
    }

    render() {
        if (this.state.window === 'auth') {
            return <AuthWindow openAuth={this.props.openAuth} openReg={this.openReg} login = {this.props.login} url={this.props.url}/>
        } else if (this.state.window === 'reg') {
            return <RegWindow finishReg = {this.finishReg} openReg={this.openReg} url={this.props.url}/>
        }
    }
}
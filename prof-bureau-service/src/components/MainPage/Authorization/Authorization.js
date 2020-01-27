import React from 'react'
import './Auth.css'
import AuthWindow from './AuthWindow'
import RegWindow from './RegWindow'
import { store } from '../../../store'

export default class Authorization extends React.Component {

    render() {
        let page = store.getState().page
        if (page === 'auth') {
            return <AuthWindow url={this.props.url} login={this.props.login}/>
        } else if (page === 'reg') {
            return <RegWindow url={this.props.url}/>
        }
    }
}
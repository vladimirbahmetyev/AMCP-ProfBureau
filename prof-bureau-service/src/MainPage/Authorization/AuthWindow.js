import React from 'react'
import './Auth.css'

export default class AuthWindow extends React.Component {
    render() {
        return (
            <div className='auth-background'>
                <div className='auth-window'>
                    <p className='auth-text'>Авторизация</p>
                    <div className='auth-button'>
                        <div className='auth-icon'></div>
                        <p className='vk-text'>Войти с помощью VK</p>
                    </div>
                </div>
                <div className='close-circle' onClick={() => this.props.openAuth(false)}>
                </div>
            </div>
        )
    }
}
import React from 'react'
import './Auth.css'

export default class AuthWindow extends React.Component {

    // vkAuth = () => {
    //     VK.init({apiId: __APP_ID___})
    //     VK.Widgets.Auth("vk_auth", {width: "300px", authUrl: '/vklogin.php?'})
    // }

    render() {
        return (
            <div className='auth-background'>
                <div className='auth-window'>
                    <p className='auth-text'>Авторизация</p>
                    <div className='auth-button'>
                        <div className='auth-icon'></div>
                        <div className='vk-text' onClick={() => this.props.openReg()}>
                        {/* <div className='vk-text' onClick={() => this.vkAuth()}> */}
                            <p>Войти с помощью VK</p>
                        </div>
                    </div>
                </div>
                <div className='close-circle' onClick={() => this.props.openAuth(false)}>
                </div>
            </div>
        )
    }
}
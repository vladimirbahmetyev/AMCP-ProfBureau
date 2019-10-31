import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {

    state = {
        isAuthorized: false,
        login: '',
        course: 0
    }

    changeMainState = (inputLogin) => {
        this.setState({
            isAuthorized: true,
            login: inputLogin
        })
    }

    render() {
        return (
            <MainPage changeMainState={this.changeMainState}
                        isAuthorized={this.state.isAuthorized}
                        login={this.state.login}
                        course={this.state.course}
                        />
        );
    }
}

export default App;

import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            <MainPage url="http://84eb1cb0.ngrok.io/api/"/>
        );
    }
}

export default App;
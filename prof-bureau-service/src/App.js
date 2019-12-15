import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            <MainPage url="http://51fdc9d8.ngrok.io/api/"/>
        );
    }
}

export default App;
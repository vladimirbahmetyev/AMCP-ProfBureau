import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            <MainPage url="http://778707bc.ngrok.io/api/"/>
        );
    }
}

export default App;
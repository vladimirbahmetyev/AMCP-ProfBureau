import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            <MainPage url="http://235d454f.ngrok.io/api/"/>
        );
    }
}

export default App;
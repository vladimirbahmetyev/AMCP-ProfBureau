import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            // <MainPage url="http://192.168.0.102:8000/api/"/>
            <MainPage url={document.location.href + 'api/'}/>
        );
    }
}

export default App;
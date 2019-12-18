import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            // <MainPage url="http://172.23.111.195:8000/api/"/>
            <MainPage url={document.location.href}/>
        );
    }
}

export default App;
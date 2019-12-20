import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            <MainPage url="https://pb-amcp-app.herokuapp.com/api/"/>
            // <MainPage url={document.location.href}/>
        );
    }
}

export default App;
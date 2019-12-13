import React from 'react';  
import MainPage from './MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            <MainPage url="http://127.0.0.1:8000/api/"/>
        );
    }
}

export default App;
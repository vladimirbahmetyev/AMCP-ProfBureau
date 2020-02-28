import React from 'react';  
import MainPage from './components/MainPage/MainPage';

class App extends React.Component {
    render() {
        return (
            // <MainPage url="http://192.168.0.103:8000/api/"/>
            <MainPage url={document.location.href + 'api/'}/>
        );
    }
}

export default App;
import React from 'react';  
import MainPage from './components/MainPage/MainPage';
import {Provider} from 'react-redux'
import {store} from "./redux/store"

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainPage url="http://127.0.0.1:8000/api/"/>
            </Provider>
            // <MainPage url={document.location.href + 'api/'}/>
        );
    }
}

export default App;
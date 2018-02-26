import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers/rootReducer'
import {createStore} from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
  <Provider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));
registerServiceWorker();


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore} from 'redux';
import rootReducer from './reducers/root_reducer';
import ConnectedApplication from './components/application/application';
import { initialState } from './settings';


export const store = createStore(rootReducer);
render (
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
)


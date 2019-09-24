import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore} from 'redux';
import { rootReducer } from './reducers/root_reducer';
import ConnectedApplication from './components/application/application';
import { initialState } from './settings';

// ReactDOM.render(<App />, document.getElementById('root'));

export const store = createStore(rootReducer, initialState);
// console.log(initialState.isConnected)
// console.log('created store')
// console.log(store.getState());

render (
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
)
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

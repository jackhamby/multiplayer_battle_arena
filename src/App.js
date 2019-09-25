import React from 'react';
import './App.css';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/root_reducer';
import ConnectedApplication from './components/application/application';
import { initialState } from './settings';

class App extends React.Component {
	render(){
		return (
			<ConnectedApplication/>			
		);
	}

}
export default App;

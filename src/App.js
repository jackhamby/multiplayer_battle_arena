import React from 'react';
import Application from './components/application/application';
import './App.css';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/root_reducer';
import ConnectedApplication from './components/application/application';


export const store = createStore(rootReducer);

class App extends React.Component {
	render(){
		return (
			<Provider store={store}>
				<ConnectedApplication/>
			</Provider>
			
		);
	}

}
export default App;

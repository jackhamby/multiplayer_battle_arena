import React from 'react';
import './App.css';
import GameWrapper from './components/game/game_wrapper';
import PlayerListWrapper from './components/player_list/player_list_wrapper';
import PlayerDetailWrapper from './components/player_detail/player_detail_wrapper';
import HeaderWrapper from './components/header/header_wrapper';
import AppState from './AppState';


class App extends React.Component {
	render(){
		return (
			<div className="container-fluid container"> 
				<div className="row top-container">
					<HeaderWrapper></HeaderWrapper>
				</div>
				<div className="row center-container">
					<GameWrapper></GameWrapper>
					<PlayerListWrapper></PlayerListWrapper>
				</div>
				<div className="row bottom-container">
					<PlayerDetailWrapper></PlayerDetailWrapper>
				</div>
			</div>
		);
	}

}
export default App;

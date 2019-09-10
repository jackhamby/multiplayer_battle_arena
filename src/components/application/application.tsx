import React from 'react';
import AppState from '../../AppState';
import GameWrapper from '../game/game_wrapper';
import PlayerListWrapper from '../player_list/player_list_wrapper';
import PlayerDetailWrapper from '../player_detail/player_detail_wrapper';
import HeaderWrapper from '../header/header_wrapper';

interface AppState {
    players: Player[];
}

interface Player {
    ip: string;
    name: string;
    x: number;
    y: number;
}

class Application extends React.Component<AppState>{
    render() {
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
        )
    }
}
export default Application;
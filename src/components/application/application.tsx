import React from 'react';
import GameWrapper from '../game/game_wrapper';
import PlayerListWrapper from '../player_list/player_list_wrapper';
import PlayerDetailWrapper from '../player_detail/player_detail_wrapper';
import HeaderWrapper from '../header/header_wrapper';
import ConnectionManager from '../../util/connection_manager'
import Error from '../util/error';
// import io from 'socket.io';
// import openSocket from 'socket.io-client';


export interface AppState {
    players: Player[];
    error?: string;
}

export interface Player {
    ip: string;
    name: string;
    x: number;
    y: number;
}

export interface AppProps {};

const connectionManager = new ConnectionManager();

class Application extends React.Component<AppProps, AppState>{
    constructor(props: AppProps){
        super(props);
        this.state = {
            players: [],
            error: undefined
        } as AppState;

    }

    componentDidMount(){
        try{
            connectionManager.connect();     
        }
        catch (err){
            this.setState({error: err});
        }
    }

    render() {
        if (this.state.error){
            return (
                <div className="container-fluid container">
                    <Error></Error>
                </div>
            )
        }
        else{
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
}
export default Application;
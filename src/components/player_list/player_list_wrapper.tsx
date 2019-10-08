import React from 'react';
import { Player, AppState } from '../../types/app_state';
import *  as redux from 'react-redux';

export interface PlayerListProps {
    players: {
        [key: string] : Player;
    }
}

export interface PlayerListState {

}


class PlayerListWrapper extends React.Component<PlayerListProps, PlayerListState > {

    constructor(props: PlayerListProps){
        super(props);
    }

    render(){
        // console.log('rendeirng playerlist wrapper   ')
        // console.log(this.props)

        return (
            <div className="col-4 container">
                {
                    Object.keys(this.props.players).map( playerId => {
                        return (<div> playerId </div>)
                    })
                }
            </div>
        )
    }
}


export const mapStateToProps = (state: AppState) => {
    return {
        ...state,
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        // connect: () => dispatch(connect()),
        // disconnect: (event: Event, id: string) => dispatch(disconnect(event, id)),
        // addPlayer: (id: string) => dispatch(addPlayer(id)),
        // removePlayer: () => dispatch(removePlayer()),
        // init: (state: AppState) => dispatch(init(state)),
    };
}

const ConnectedPlayerListWrapper = redux.connect(mapStateToProps, mapDispatchToProps)(PlayerListWrapper)

export default ConnectedPlayerListWrapper;
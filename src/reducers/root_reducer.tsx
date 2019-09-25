// import connection_reducer from './connection_reducer';
// import game_reducer from './game_reducer';
// import  { combineReducers } from 'redux';
// export const rootReducer = combineReducers({
//     connection_reducer, 
//     game_reducer
// });
// export default rootReducer;


import { AnyAction } from "redux";
import { AppState, Player } from '../components/application/application'
import { Reducer, Action} from 'redux';

export const INIT = "INIT"
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

// Actions
export interface InitAction extends Action {
    type: typeof INIT,
    state: AppState
}

export interface ConnectAction extends Action {
    type: typeof CONNECT
}

export interface DisconnectAction extends Action {
    type: typeof DISCONNECT,
    reason: string
}

export interface AddPlayerAction extends Action {
    type: typeof ADD_PLAYER,
    id: string,
}

export interface RemovePlayerAction extends Action {
    type: typeof REMOVE_PLAYER
}

export const init = (state: AppState) => {
    return {
        type: INIT,
        state
    }
}

export const addPlayer = (id: string) => {
    return {
        type: ADD_PLAYER,
        id
    } as AddPlayerAction;
}

export const removePlayer = () => {
    return {
        type: REMOVE_PLAYER
    } as RemovePlayerAction;
}

export const connect = () => {
    return {
        type: CONNECT,
    } as ConnectAction
}

export const disconnect = (reason: string) => {
    return {
        type: DISCONNECT,
        reason: reason
    } as DisconnectAction
}

const initialState = {
    isConnected: false,
    players: [] as Player[]
} as AppState;
 

const rootReducer: Reducer<AppState> = (state: AppState = initialState, action) => {

    switch(action.type){

        // Connection actions
        case INIT:
            console.log('need to initialize application')
            console.log(state)
        case CONNECT:
            console.log('connect hooked into reducer');
            return {
                error: state.error,
                players: state.players,
                isConnected: true
            } as AppState;
        case DISCONNECT:
            console.log('disconnect hooked into reducer');
            return {
                error: state.error,
                players: state.players,
                isConnected: false
            } as AppState;
        



        case (ADD_PLAYER):
            console.log('add player in game_reducer');
            // console.log(state)
            const newPlayer = {
                id: action.id,
                name: `player${state.players.length}`,
                x: 0,
                y: 0
            } as Player;
            return {
                error: state.error,
                isConnected: state.isConnected,
                players: [
                    ...state.players,
                    newPlayer
                ]
            };
        case (REMOVE_PLAYER):
            console.log('remove player in game reducer')  
            return {
                ...state
            };
        default:
            return state  
 
    }


}

export default rootReducer;

// import connection_reducer from './connection_reducer';
// import game_reducer from './game_reducer';
// import  { combineReducers } from 'redux';
// export const rootReducer = combineReducers({
//     connection_reducer, 
//     game_reducer
// });
// export default rootReducer;


import { AppState, Player } from '../types/app_state';
import { Reducer, Action} from 'redux';
import App from '../App';

export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";
export const UPDATE = "UPDATE";
export const INIT = "INIT";

export interface ConnectAction extends Action {
    type: typeof CONNECT;
}
export interface DisconnectAction extends Action {
    type: typeof DISCONNECT;
    event: Event;
    id: string;
}

export interface UpdateAction extends Action {
    type: typeof UPDATE;
    state: AppState;
}

export interface InitAction extends Action {
    type: typeof INIT;
    playerId: string;
}

export const connect = () => {
    return {
        type: CONNECT,
    } as ConnectAction
}

export const disconnect = (event: Event, id: string) => {
    return {
        type: DISCONNECT,
        event,
        id
    } as DisconnectAction
}

export const update = (state: AppState) => {
    return {
        type: UPDATE,
        state
    }
}

export const init = (playerId: string, state: AppState) => {
    return {
        type: INIT,
        playerId, 
        state
    }
}

const initialState = {
    isConnected: false,
    players: {},
    currentPlayerId: ""
} as AppState;
 

const rootReducer: Reducer<AppState> = (state: AppState = initialState, action) => {
    switch(action.type){

        case CONNECT:
            console.log('\n')
            console.log('connect hooked into reducer');
            console.log('\n')
            return {
                ...state,
                error: state.error,
                players: state.players,
                isConnected: true
            } as AppState;
        case DISCONNECT:
            console.log('\n')
            console.log('disconnect hooked into reducer');
            console.log('\n')
            return {
                ...state,
                error: state.error,
                players: state.players,
                isConnected: false
            } as AppState;
        case UPDATE:
            console.log('\n')
            console.log('update hooked into reducer');
            console.log('\n')
            return {
                ...action.state,
                currentPlayerId: state.currentPlayerId
            } as AppState;
        case INIT:
                console.log()
                console.log('\n')
                console.log('init hooked into reducer');
                console.log(JSON.stringify(action.state))
                console.log('\n')
                // console.log(action)
            return {
                ...action.state,
                currentPlayerId: action.playerId,
            } as AppState;
        default:
            return {
                ...state
            } as AppState;
    }
}

export default rootReducer;

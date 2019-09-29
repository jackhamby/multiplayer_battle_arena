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
export const UPDATE_PLAYER = "UPDATE_PLAYER";

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
    event: Event,
    id: string
}
export interface AddPlayerAction extends Action {
    type: typeof ADD_PLAYER,
    id: string,
}
export interface RemovePlayerAction extends Action {
    type: typeof REMOVE_PLAYER,
    id: string
}
export interface UpdatePlayerAction extends Action {
    type: typeof UPDATE_PLAYER,
    id: string;
    x: number;
    y: number;
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

export const removePlayer = (id: string) => {
    return {
        type: REMOVE_PLAYER,
        id
    } as RemovePlayerAction;
}

export const updatePlayer = (id: string, x: number, y: number) => {
    return {
        type: UPDATE_PLAYER,
        id,
        x,
        y
    } as UpdatePlayerAction
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

const initialState = {
    isConnected: false,
    players: {},
    currentPlayerId: ""
} as AppState;
 

const rootReducer: Reducer<AppState> = (state: AppState = initialState, action) => {
    switch(action.type){

        // Connection actions
        case INIT:
            console.log('\n')
            console.log('intialize in reducer')
            console.log('\n')
            return {
                ...state,
                ...action.state,
            }
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






        case ADD_PLAYER:
            const newPlayer = {
                id: action.id,
                name: `player${state.players.length}`,
                x: 0,
                y: 0
            } as Player;
            console.log('\n')
            console.log(`add player in reducer  ${action.id}`);
            console.log('\n')
            
            return {
                error: state.error,
                isConnected: state.isConnected,
                players: {
                    ...state.players,
                    [newPlayer.id] : newPlayer,
                },
                currentPlayerId: state.currentPlayerId ? state.currentPlayerId : newPlayer.id
            };
        case REMOVE_PLAYER:
            console.log('\n')
            console.log(`remove player in reducer ${ action.id }`)  
            console.log('\n')

            delete state.players[action.id]
            return {
                ...state,
                players: {
                    ...state.players
                }
            };


        case UPDATE_PLAYER:
            console.log('\n')
            console.log(`update player in reducer ${ action.id } ${action.x}, ${action.y}`)  
            console.log('\n')
            state.players[action.id].x = action.x;
            state.players[action.id].y = action.y;
            return {
                ...state,
                players: {
                    ...state.players
                }
            }
    
        
        default:
            return state  
 
    }


}

export default rootReducer;

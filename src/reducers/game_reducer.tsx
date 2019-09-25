import { AnyAction } from "redux";
import { AppState, Player } from '../components/application/application'
import { Reducer, Action} from 'redux';
// import { initialState } from '../settings';

export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

export interface AddPlayerAction extends Action {
    type: typeof ADD_PLAYER
}

export interface RemovePlayerAction extends Action {
    type: typeof REMOVE_PLAYER
}

export const addPlayer = () => {
    return {
        type: ADD_PLAYER
    } as AddPlayerAction;
}

export const removePlayer = () => {
    return {
        type: REMOVE_PLAYER
    } as RemovePlayerAction;
}

const initialState = {
    isConnected: false,
    players: [] as Player[]
} as AppState;
 

export const game_reducer = (state: AppState = initialState, action: any) => {
    switch(action.type){
        case (ADD_PLAYER):
            console.log('add player in game_reducer');
            // console.log(state)
            const newPlayer = {
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


export default game_reducer;
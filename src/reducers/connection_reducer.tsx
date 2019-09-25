import { AppState, Player } from '../components/application/application';
// import { initialState } from '../settings';
import { Reducer, Action} from 'redux';

export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";

// Actions
export interface ConnectAction extends Action {
    type: typeof CONNECT
}

export interface DisconnectAction extends Action {
    type: typeof DISCONNECT,
    reason: string
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
    players: [] as Player[],
    error: undefined
} as AppState;

const connection_reducer: Reducer<AppState> = (state: AppState = initialState, action) => {
    switch(action.type){
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
        default: 
            return state;
    }
}
export default connection_reducer;
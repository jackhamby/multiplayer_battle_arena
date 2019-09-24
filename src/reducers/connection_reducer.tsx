import { AppState } from '../components/application/application';
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

const connection_reducer: Reducer<AppState> = (state: AppState = { } as AppState, action) => {
    switch(action.type){
        case CONNECT:
            console.log('connect hooked into reducer');
            return {
                ...state,
                players: [],
                isConnected: true
            } as AppState;
        case DISCONNECT:
            console.log('disconnect hooked into reducer');
            return {
                ...state,
                isConnected: false
            } as AppState;
        default: 
            return state;
    }
}
export default connection_reducer;
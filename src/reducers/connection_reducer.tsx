import { AppState } from '../components/application/application';
import { Reducer, Action} from 'redux';

export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";


export interface ConnectAction extends Action {
    type: typeof CONNECT
}

const x = {} as ConnectAction;
export interface DisconnectAction extends Action {
    type: typeof DISCONNECT
}

export const connect = () => {
    return {
        type: CONNECT
    }
}

export const disconnect = () => {
    return {
        type: DISCONNECT
    }
}

const connection_reducer: Reducer<AppState> = (state: AppState = { } as AppState, action) => {
    switch(action.type){
        case CONNECT:
            console.log('connect hooked into reducers')
            console.log()
            return {
                ...state,
                players: []
            } as AppState;
        case DISCONNECT:
            console.log('disconnect hooked into reducer')
            return state;
        default: 
            return state;
    }
}
export default connection_reducer;
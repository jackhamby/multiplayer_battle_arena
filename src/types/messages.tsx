import { AppState, Player } from './app_state';
import App from '../App';

export interface Message {
    type: string;
    data: any;
}

export const WELCOME_MESSAGE = "welcome";
export interface WelcomeData {
    id: string;
    state: AppState;
}

export const UPDATE_MESSAGE = "update";
export interface UpdateData {
    state: AppState;
}

export const UPDATE_PLAYER_MESSAGE = "update_player";
export interface UpdatePlayerData {
    player: Player;
}

export const DISCONNECT_MESSAGE = "disconnect";
export interface DisconnectData {
    id: string;
}



export const updatePlayerMessage = (player: Player) : Message => {
    return {
        type: UPDATE_PLAYER_MESSAGE,
        data: {
            player
        } as UpdatePlayerData
    }
}

export const disconnectMessage = (id: string) : Message => {
    return {
        type: DISCONNECT_MESSAGE,
        data: {
            id
        } as DisconnectData
    }
}



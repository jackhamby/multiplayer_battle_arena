
export interface AppState {
    error?: string;
    isConnected: boolean;
    players: {
        [key: string]: Player;
    }
    currentPlayerId: string;
}

export interface Player {
    id: string;
    name: string;
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number
}

export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
}


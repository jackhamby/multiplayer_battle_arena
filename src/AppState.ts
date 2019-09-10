




interface AppState {
    players: Player[];
}

interface Player {
    ip: string;
    name: string;
    x: number;
    y: number;
}

export default AppState;
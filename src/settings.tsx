import{ AppState, Player } from './types/app_state';
interface AppConfig  {
    gameServerUrl: string;
    gameServerPort: number;
}
const config = {
    gameServerUrl: 'ws://167.99.12.117',
    // gameServerUrl: "ws://localhost",
    gameServerPort: 3001
} as AppConfig;

export const initialState = {
    players: {},
    isConnected: false,
    error: undefined,
    currentPlayerId: "",
} as AppState;

export default config;
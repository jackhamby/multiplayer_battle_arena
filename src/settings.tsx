import{ AppState, Player } from './components/application/application';
interface AppConfig  {
    gameServerUrl: string;
    gameServerPort: number;
}
const config = {
    gameServerUrl: "ws://localhost",
    gameServerPort: 3001
} as AppConfig;

export const initialState = {
    players: [] as Player[],
    isConnected: false,
    error: undefined
} as AppState;

export default config;
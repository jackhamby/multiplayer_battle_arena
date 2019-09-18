import { string } from "prop-types";

interface AppConfig  {
    gameServerUrl: string;
    gameServerPort: number;
}
const config = {
    gameServerUrl: "ws://localhost",
    gameServerPort: 3001
} as AppConfig;

export default config;
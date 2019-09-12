import { string } from "prop-types";

interface AppConfig  {
    gameServerUrl: string;
}
const config = {
    gameServerUrl: "ws://localhost:3001"
} as AppConfig;

export default config;
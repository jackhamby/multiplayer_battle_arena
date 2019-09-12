import config from '../settings';


class ConnectionManager{
    
    isReady: boolean;
    socket?: WebSocket;

    constructor(){
        this.isReady = false;
        this.socket = undefined;
    }

    connect(){
        this.socket = new WebSocket(config.gameServerUrl);
        this.socket.onopen = event => {
            console.log('socket opened');
        }

        this.socket.onclose = event => {
            console.log('closed');
        }
        this.socket.onerror = error => {
            console.log(error)
            throw(error);
        }
        return null;
    }

}

export default ConnectionManager;
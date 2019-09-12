import config from '../settings';

class ConnectionManager {

    connect(){
        this.socket = new WebSocket(config.gameServerUrl);

        this.socket.onopen = event => {
            console.log('socket opened');
        }

        this.socket.onclose = event => {
            console.log('closed');
        }
    }

}

export default ConnectionManager;
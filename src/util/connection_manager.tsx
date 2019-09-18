import config from '../settings';
import io from 'socket.io';
import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3001');
// socket.emit('message', 1000);
// console.log('mouting')
class ConnectionManager {
    
    isReady: boolean;
    socket: SocketIOClient.Socket;

    constructor(){
        this.isReady = false;
        this.socket =  {} as SocketIOClient.Socket;
    }

    connect(){
        this.socket = openSocket('http://localhost:3001');
        this.socket.send('hello something');
        // console.log('mouting')
        this.socket.on('message', (update: any) => {
            console.log('update sent with ')
            console.log(update)
        })
        // this.socket = new WebSocket(
        //     `${config.gameServerUrl}:${config.gameServerPort}`
        // );
        // this.socket.onerror = this.error.bind(this);
        // this.socket.onmessage = this.receive.bind(this);
        // this.socket.onclose =  this.close.bind(this);
        // this.socket.onopen = this.open.bind(this);
    }

    send(message: string){
        this.socket.send(message);
    }

    receive(event: MessageEvent){

    }

    open(event: Event){
        console.log('opened connection')
        this.send('FUCK WAS')

    }   

    error(event: Event){
        console.log(event)
        // throw('Failed to connect to game server.')
    }

    close(event: CloseEvent){

    }

}

export default ConnectionManager;
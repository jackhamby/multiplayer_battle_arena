import config from '../settings';
import io from 'socket.io';
import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3001');
// socket.emit('message', 1000);
// console.log('mouting')
class ConnectionManager {
    
    // isReady: boolean;
    socket: SocketIOClient.Socket;

    constructor(){
        // this.isReady = false;
        this.socket =  {} as SocketIOClient.Socket;
    }

    connect(onConnect: Function, onDisconnect: Function){
        this.socket = openSocket('http://localhost:3001', {});
        this.socket.send('hello something');
        this.socket.on('message', this.receive.bind(this));
        this.socket.on('connect_error', this.error.bind(this));
        this.socket.on('connect', onConnect);
        this.socket.on('disconnect', onDisconnect);
    }

    send(message: string){
        console.log('\n');
        console.log(`sending this message to the server ${message}`);
        console.log('\n');

        this.socket.send(message);
    }

    receive(event: MessageEvent){
        console.log('\n');
        console.log(`recieved message from server ${event}`);
        console.log('\n');

    }

    // open(event: Event){
    //     console.log('\n');
    //     console.log('opened connection');
    //     console.log('\n');

    //     this.isReady = true;
    // }   

    error(event: Event){
        console.log('\n');
        console.log('there was an error connecting');
        console.log('\n');
        
        // this.isReady = false;
    }

    // close(event: CloseEvent){
    //     console.log('\n');
    //     console.log('connection was closed')
    //     console.log('\n');

    // }

}

export default ConnectionManager;
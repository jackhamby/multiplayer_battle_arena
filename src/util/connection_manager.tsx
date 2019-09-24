import config from '../settings';
import io from 'socket.io';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
// import { store } from '../App';

class ConnectionManager {
    
    // isReady: boolean;
    socket: SocketIOClient.Socket;
    onOpen: Function;
    onClose: Function;

    constructor(connect: Function = () => {}, disconnect: Function = () => {}){
        // this.isReady = false;
        this.socket =  {} as SocketIOClient.Socket;
        this.onOpen = connect;
        this.onClose = disconnect;
    }

    connect(){
        this.socket = openSocket('http://localhost:3001', {});
        this.socket.send('hello something');
        this.socket.on('message', this.receive.bind(this));
        this.socket.on('connect_error', this.error.bind(this));
        this.socket.on('connect', this.open.bind(this));
        this.socket.on('disconnect', this.close.bind(this));
    }

    open(){
        this.onOpen();
    }

    close(reason: string){
        this.onClose(reason);
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

    error(event: Event){
        console.log('\n');
        console.log('there was an error connecting');
        console.log('\n');
    }

}

export default ConnectionManager;
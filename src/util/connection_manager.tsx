import config from '../settings';
import io from 'socket.io';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { Message } from '../components/application/application';
// import { store } from '../App';




class ConnectionManager {
    
    // isReady: boolean;
    socket: SocketIOClient.Socket;
    onOpen: Function;
    onClose: Function;
    onMessage: Function;

    constructor(connect: Function = () => {},
                disconnect: Function = () => {}, 
                receiveMessage: Function = () => {}){
        this.socket =  {} as SocketIOClient.Socket;
        this.onOpen = connect;
        this.onClose = disconnect;
        this.onMessage = receiveMessage;
    }

    connect(){
        this.socket = openSocket('http://localhost:3001', {});
        // this.socket.send('hello something');
        this.socket.on('message', this.onMessage.bind(this));
        this.socket.on('connect_error', this.error.bind(this));
        this.socket.on('connect', this.onOpen.bind(this));
        this.socket.on('disconnect', this.onClose.bind(this));
    }

    send(message: string){
        console.log('\n');
        console.log(`sending this message to the server ${message}`);
        console.log('\n');
        this.socket.send(message);
    }

    emit(message: Message){

        this.socket.emit('message', message);
        // this.socket.send('fuck')
    }

    error(event: Event){
        console.log('\n');
        console.log('there was an error connecting');
        console.log('\n');
    }

}

export default ConnectionManager;
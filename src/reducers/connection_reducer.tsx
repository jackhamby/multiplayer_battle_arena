import AppState from '../components/application/application';
import { AnyAction, Reducer } from 'redux';

  
  // Unfortunately, typing of the `action` parameter seems to be broken at the moment.
  // This should be fixed in Redux 4.x, but for now, just augment your types.
  
//   const reducer: Reducer<ChatState> = (state: ChatState = initialState, action) => {
//     // We'll augment the action type on the switch case to make sure we have
//     // all the cases handled.
//     switch ((action as ChatActions).type) {
//       case '@@chat/SET_USERNAME':
//         return { ...state, username: action.username };
//       case '@@chat/USERS_LIST_UPDATED':
//         return { ...state, connectedUsers: action.users };
//       case '@@chat/MESSAGE_RECEIVED':
//         return { ...state, messages: [...state.messages, action.payload] };
//       default:
//         return state;
//     }
//   };
  
//   export default reducer;

const connection_reducer: Reducer<AppState> = (state: AppState = { } as AppState, action) => {
    switch(action.type){
        case 'CONNECT':
            console.log('picked up by reducer')
            return state;
        default: 
            return state;
    }
}

export default connection_reducer;
import { AUTHENTICATE, LOGOUT } from '../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  userId: null,
  user:AsyncStorage.getItem('userData')?.email
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        user:action.email

      };
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
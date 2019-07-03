import {IUser, User} from '../models/user.model';
import {AUTH_REDUCER, AuthReducerAction} from './auth.reducer';

export interface IAuthState {
  user: User;
}

const initState: IAuthState = {
  user: null
};

export function authReducer(state = initState, action: AuthReducerAction): IAuthState {

  switch (action.type) {
    case AUTH_REDUCER.SET_USER:
      return {
        user: Object.assign({}, action.user)
      };
    default:
      return state;
  }

}

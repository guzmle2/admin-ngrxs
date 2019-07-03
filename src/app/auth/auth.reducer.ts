import {Action} from '@ngrx/store';
import {User} from '../models/user.model';

export enum AUTH_REDUCER {
  SET_USER = '[Auth] set user',
}

export class SetUserAction implements Action {
  readonly type = AUTH_REDUCER.SET_USER;

  constructor(public user: User) {
  }
}


export type AuthReducerAction = SetUserAction;

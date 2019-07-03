import {ActionReducerMap} from '@ngrx/store';
import {authReducer, IAuthState} from './auth/auth.actions';
import {IState, uiReducer} from './shared/redux/ui.actions';

export interface IAppState {
  ui: IState;
  auth: IAuthState;
}

export const AppReducers: ActionReducerMap<IAppState> = {
  ui: uiReducer,
  auth: authReducer
};

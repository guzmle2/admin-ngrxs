import {ADMIN_REDUCER, AdminReducerAction} from './admin.reducer';
import {IngresoEgreso} from '../models/ingreso-egreso.model';

export interface IAdminState {
  items: IngresoEgreso[];
}

// @ts-ignore
export interface IAppState extends IAppState {
  admin: IAdminState;
}

const initState: IAdminState = {
  items: []
};

export function adminhReducer(state = initState, action: AdminReducerAction): IAdminState {

  switch (action.type) {
    case ADMIN_REDUCER.SET_ITEMS:
      return {
        items: [...action.items.map(e => Object.assign({}, e))]
      };
    case ADMIN_REDUCER.REMOVE_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }

}

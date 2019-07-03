import {Action} from '@ngrx/store';
import {User} from '../models/user.model';
import {IngresoEgreso} from '../models/ingreso-egreso.model';

export enum ADMIN_REDUCER {
  SET_ITEMS = '[Admin] Set items',
  REMOVE_ITEMS = '[Admin] Remove items',
}

export class SetItemsAction implements Action {
  readonly type = ADMIN_REDUCER.SET_ITEMS;

  constructor(public items: IngresoEgreso[]) {
  }

}

export class UnsetItemsAction implements Action {
  readonly type = ADMIN_REDUCER.REMOVE_ITEMS;


}


export type AdminReducerAction =
  SetItemsAction
  | UnsetItemsAction;

import {Action} from '@ngrx/store';

export enum UI_REDUCCER {
  ACTIVAR_LOADING = '[UI Loading] Cargando...',
  DESACTIVAR_LOADING = '[UI Loading] Fin Carga...',
}

export class ActivarLoadingAction implements Action {
  readonly type = UI_REDUCCER.ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
  readonly type = UI_REDUCCER.DESACTIVAR_LOADING;
}

export type UiReducerActions =
  ActivarLoadingAction
  | DesactivarLoadingAction;

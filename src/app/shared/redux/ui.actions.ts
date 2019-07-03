import {UI_REDUCCER, UiReducerActions} from './ui.reducer';

export interface IState {
  isLoading: boolean;
}

const initState: IState = {
  isLoading: false
};

export function uiReducer(state = initState, action: UiReducerActions) {

  switch (action.type) {

    case UI_REDUCCER.DESACTIVAR_LOADING:
      return {
        isLoading: false
      };

    case UI_REDUCCER.ACTIVAR_LOADING:
      return {
        isLoading: true
      };
    default:
      return state;
  }

}

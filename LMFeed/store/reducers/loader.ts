import {SHOW_TOAST, START_LOADING, STOP_LOADING} from '../types/loader';

const initialState = {
  count: 0,
  isToast: false,
  message: '',
};

export function loader(state = initialState, action: any) {
  switch (action.type) {
    case START_LOADING: {
      return {...state, count: ++state.count};
    }
    case STOP_LOADING: {
      return {...state, count: Math.max(0, --state.count)};
    }
    case SHOW_TOAST: {
      const {isToast, message} = action.body;
      return {...state, isToast: isToast, message: message};
    }
    default:
      return state;
  }
}

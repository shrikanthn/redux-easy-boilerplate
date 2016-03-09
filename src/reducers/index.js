import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { charts } from './charts';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  charts,
});

export default rootReducer;

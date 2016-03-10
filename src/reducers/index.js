import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { charts } from './charts';
import { survey } from './survey';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  charts,
  survey,
});

export default rootReducer;

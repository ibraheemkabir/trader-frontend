import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { adsReducer } from './modules/ads';

export const rootReducer = combineReducers({
  user: userReducer,
  ads: adsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
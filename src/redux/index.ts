import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { adsReducer } from './modules/ads';
import {transactionsReducer} from './modules/transactions';

export const rootReducer = combineReducers({
  user: userReducer,
  ads: adsReducer,
  transaction: transactionsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
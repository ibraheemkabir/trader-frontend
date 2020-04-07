import { Dispatch, AnyAction } from 'redux';
import {getAds} from './../../api/api';
import {userData} from './../../data';
import {userDetailsType,adsType} from './../../interface'
import {store} from '../../index';
import {history} from './../../App';

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

const initialState: adsType = { 
    ads: [],
    loading: true
 };

export const adsSuccess = (user: userDetailsType) => {
  return typedAction('ads/SUCCESS', user);
};

export const adsFailure = () => {
  return typedAction('ads/FAILURE');
};

export const adsloading = () => {
  return typedAction('user/LOADING');
};

export function getAllAds() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'ads/LOADING',
    })
    try{
    await getAds('http://localhost:3000/allads', userData)
      .then(async (data) => 
        dispatch({
          type: 'ads/SUCCESS',
          payload: data.body
        }),
      ).then(()=>history.push('./'))
    }catch(e){
        dispatch({
            type: 'ads/FAILURE',
            payload: 'error'
        });
    }
  }
};


// export const loginUser = async (dispatch: Dispatch<AnyAction>) => {
//   console.log()
//   await userLogin('http://localhost:3000/login', userData)
//   .then(async (data) => {   
//     return (dispatch: Dispatch<AnyAction>) => {
//       setTimeout(() => {
//         dispatch(
//           login(data)
//         );
//       }, 500);
//     };
//   });
// };

type AdsAction = ReturnType<typeof adsSuccess | typeof adsFailure | typeof adsloading | any>;

export function adsReducer(
  state = initialState,
  action: AdsAction
): adsType {
  switch (action.type) {
    case 'ads/LOADING':
      return {
        ...state,
        loading: true
      }
    break
    case 'ads/SUCCESS':
      return { 
        ...state,
        ads: action.payload,
        loading: false
      };
    case 'ads/FAILURE':
    default:
      return state;
  }
}
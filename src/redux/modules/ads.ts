import { Dispatch, AnyAction } from 'redux';
import {getAds} from './../../api/api';
import {userData} from './../../data';
import {userDetailsType,adsType} from './../../interface'
import {store} from '../../index';
import {history} from './../../App';
import { toast } from 'react-toastify';

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
    ad: {},
    adloading: true,
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

export function addAd(data:any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'ad/LOADING',
    })
    try{
      await getAds('http://localhost:3005/postAd', data)
      .then(async (data:any) => {
      
      }).then(async ()=> {
      await getAllAds();
      toast('Advert Posted Successfully', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.SUCCESS,
        // @ts-ignore: Unreachable code error
      });
    })
    }catch{

    }
  }
}
export function getAllAds() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'ads/LOADING',
    })
    try{
    await getAds('http://localhost:3005/ads', userData)
      .then(async (data) => {
        return dispatch({
          type: 'ads/SUCCESS',
          payload: data.response
        })
      })
    }catch(e){
      console.log(e)
        dispatch({
            type: 'ads/FAILURE',
            payload: 'error'
        });
    }
  }
};


export function getAd(id:any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'ad/LOADING',
    })
    try{
      await getAds(`http://localhost:3005/getAd?id=${id}`, {})
        .then(async (data) => 
          dispatch({
            type: 'ad/SUCCESS',
            payload: data.response
          }),
        )
      return
    }catch(e){
      console.log(e)
        dispatch({
            type: 'ads/FAILURE',
            payload: 'error'
        });
    }
  }
};

export function getUserTransactions(id:any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'transaction/LOADING',
    })
    try{
    await getAds(`http://localhost:3005/getTransactions?id=${id}`, {})
      .then(async (data) => 
        dispatch({
          type: 'transaction/SUCCESS',
          payload: data.response
        }),
      )
    }catch(e){
      console.log(e)
        dispatch({
            type: 'transaction/FAILURE',
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
    case 'ad/LOADING':
      return {
        ...state,
        adloading: true
      }
    break
    case 'ads/SUCCESS':
      return { 
        ...state,
        ads: action.payload,
        loading: false
      };
    case 'ad/SUCCESS':
      return { 
        ...state,
        ad: action.payload,
        adloading: false
      };
    case 'ads/FAILURE':
    default:
      return state;
  }
}
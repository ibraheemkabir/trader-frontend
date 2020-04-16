import { Dispatch, AnyAction } from 'redux';
import {userLogin} from './../../api/api';
import {userData} from './../../data';
import {userDetailsType} from './../../interface'
import {store} from '../../index';
import { routerMiddleware, push } from 'react-router-redux'
import {history} from './../../App';

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

const initialState: userDetailsType = { 
  "name": '',
  "email": '',
  "_id": '',
  "telegram": '',
  "whatsapp": '',
  "unifyreId": '',
  "country": '',
  "zip": '',
  "city": '',
  "id": 0,
  "loading": false
 };

export const login = (user: userDetailsType) => {
  return typedAction('user/LOGIN', user);
};

export const logout = () => {
  return typedAction('user/LOGOUT');
};

export const loading = () => {
  return typedAction('user/LOADING');
};

export function loginUser(id:any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'user/LOADING',
    })
    await userLogin(`http://localhost:3005/login?id=${id}`, userData)
      .then(async (data) => {
        dispatch({
          type: 'user/LOGIN',
          payload: data.response
        });
        localStorage.setItem('user', JSON.stringify(data.response));
      }).then(()=>history.push('./'))
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

type UserAction = ReturnType<typeof login | typeof logout | typeof loading | any>;

export function userReducer(
  state = initialState,
  action: UserAction
): userDetailsType {
  console.log(action);
  switch (action.type) {
    case 'user/LOADING':
      return {
        name: '',
        email: '',
        _id: '',
        telegram: '',
        whatsapp: '',
        unifyreId: '',
        country: '',
        zip: '',
        city: '',
        id: 0,
        loading: true
      }
    break
    case 'user/LOGIN':
      return { 
        ...action.payload,
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        telegram: action.payload.telegram,
        whatsapp: action.payload.whatsapp,
        unifyreId: action.payload.unifyreId,
        country: action.payload.country,
        zip: action.payload.zip,
        city: action.payload.city,
        id: action.payload.id,
        advertiser: action.payload.advertiser,
        loading: false
      };
    case 'user/LOGOUT':
    default:
      return state;
  }
}
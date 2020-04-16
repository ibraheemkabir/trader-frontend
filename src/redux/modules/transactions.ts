import { Dispatch, AnyAction } from 'redux';
import {getAds} from './../../api/api';
import {transactionsType} from './../../interface'
import { ToastContainer, toast } from 'react-toastify';

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

const initialState: transactionsType = { 
    transactions: [],
    loading: true
 };

export const transactionsSuccess = (transactions: transactionsType) => {
  return typedAction('transactions/SUCCESS', transactions);
};

export const transactionsFailure = () => {
  return typedAction('transactions/FAILURE');
};

export const transactionsloading = () => {
  return typedAction('transactions/LOADING');
};

export function getUserTransactions(id:any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'transactions/LOADING',
    })
    try{
    await getAds(`http://localhost:3005/getTransactions`, {id})
      .then(async (data) => 
        dispatch({
          type: 'transactions/SUCCESS',
          payload: data.response
        }),
      )
    }catch(e){
      console.log(e)
        dispatch({
            type: 'transactions/FAILURE',
            payload: 'error'
        });
    }
  }
};

export function getTransaction(id:any,history:any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'transactions/LOADING',
    })
    try{
    await getAds(`http://localhost:3005/getTransaction`, {id})
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

export function traderUpdateTransaction(id:any,history:any){
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'update/LOADING',
    })
    try{
    await getAds(`http://localhost:3005/trader/updateTransaction`, {id})
      .then(async (data) => 
        dispatch({
          type: 'update/SUCCESS',
          payload: data.response
        }),
      ).then(()=>history.push('/traderTransactions'))
    }catch(e){
      console.log(e)
        dispatch({
            type: 'update/FAILURE',
            payload: 'error'
        });
    }
  }
}

export function getRequests(id:any) {
  console.log(id,'heR======')
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: 'requests/LOADING',
    })
    try{
    await getAds(`http://localhost:3005/trader/transactions`, {id})
      .then(async (data) => {
        dispatch({
          type: 'requests/SUCCESS',
          payload: data.response
        });
        console.log(data,'requesssts')
      })
    }catch(e){
      console.log(e)
        dispatch({
            type: 'requests/FAILURE',
            payload: 'error'
        });
    }
  }
};

export function makeRequest(data:any){
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch({
          type: 'transactions/LOADING',
        })
        try{
        await getAds(`http://localhost:3005/requestTransaction`, data)
          .then(async (data) => {
            toast('Request Succesfully sent', {
                position: toast.POSITION.TOP_CENTER,
                type: toast.TYPE.SUCCESS,
                // @ts-ignore: Unreachable code error
            });
            dispatch({
              type: 'transactionRequest/SUCCESS',
              payload: data.response
            })
          })
        }catch(e){
          console.log(e)
            dispatch({
                type: 'transactions/FAILURE',
                payload: 'error'
            });
        }
      }
}

type transactionsAction = ReturnType<typeof transactionsSuccess | typeof transactionsFailure | typeof transactionsloading | any>;

export function transactionsReducer(
  state = initialState,
  action: transactionsAction
): transactionsType {
  switch (action.type) {
    case 'transactions/LOADING':
      return {
        ...state,
        loading: true
      }
    break
    case 'transactions/SUCCESS':
      return { 
        ...state,
        transactions: action.payload,
        loading: false
      };
    case 'transaction/LOADING':
      return {
        ...state,
        loading: true
      }
      break
    case 'transaction/SUCCESS':
      return { 
        ...state,
        transaction: action.payload,
        loading: false
      };
    case 'requests/LOADING':
      return {
        ...state,
        requests: {
          loading: true,
        }
      }
    case 'requests/SUCCESS':
      return {
        ...state,
        requests: {
          loading: false,
          data: action.payload
        }
      }
    case 'update/LOADING':
      return {
        ...state,
        update: {
          loading: true,
          success:true
        }
      }
    case 'update/SUCCESS':
      return {
        ...state,
        update: {
          loading: false,
          success:true
        }
      }
    case 'requests/FAILURE':
    case 'transactions/FAILURE':
    default:
      return state;
  }
}
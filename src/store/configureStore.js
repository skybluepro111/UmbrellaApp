import {createStore, compose, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers';
import thunk from 'redux-thunk';


export default function configureStore(initialState) {
  return createStore(rootReducer, initialState,
  applyMiddleware(thunk, createLogger()));
}
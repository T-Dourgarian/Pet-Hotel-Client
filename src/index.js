import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import {createStore, combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';

function* rootSaga() {
    yield takeEvery('GET_PETS', petsSaga);
    
}

function* petsSaga(action) {
    // axios req to get data
    // call 'SET_PET_INFO' reducer
    //communicates with server route to get pets from database
    console.log('petDetails Saga', action.payload)
    try {
        const petResponse = yield axios.get(`/dashboard/${action.payload}`);
        yield put({ type: 'SET_PET_INFO', payload: petResponse.data});
        console.log('petDetails hit with action', petResponse.data);
    } catch(error){
        console.log('error fetching pets', error)
    }
}


const sagaMiddleware = createSagaMiddleWare();

const petsReducer = (state=[],action) => {
    if(action.type === 'SET_PETS') {
        return action.payload;
    }
    return state;
}

const storeInstance = createStore(
    combineReducers({
        petsReducer
    }),
    applyMiddleware(sagaMiddleware,logger),
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance} ><App /></Provider>, document.getElementById('root'));

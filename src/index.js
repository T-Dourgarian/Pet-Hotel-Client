import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import {createStore, combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';
import {takeEvery, takeLatest, put} from 'redux-saga/effects';

function* rootSaga() {
    yield takeEvery('GET_PETS',petsSaga);
    yield takeLatest('ADD_PET', addPetSaga);
}

function* petsSaga(action) {
    // axios req to get data
    // call 'SET_PET_INFO' reducer
}

function* addPetSaga(action) {
    try {
        console.log(action.payload);
    }
    catch (error) {
        console.log('error in addPetSaga', error);  
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

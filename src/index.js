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
    yield takeEvery('GET_PETS',petsSaga);
    yield takeEvery('DELETE_PET', deletePetSaga);
    yield takeEvery('UPDATE_PET', updatePetSaga);
    yield takeEvery('ADD_OWNER', addOwnerSaga);
}

function* petsSaga(action) {
    // axios req to get data
    // call 'SET_PET_INFO' reducer
}

function* deletePetSaga(action) {
    try {
        yield axios.delete(`/pets/${action.payload.id}`);
        yield put({ type: 'GET_PETS' });
    }
    catch (error) {
        console.log('error deleting pet', error);
    }
}

function* updatePetSaga(action) {
    try {
        yield axios.put(`/pets`, action.payload);
        yield put({ type: 'GET_PETS' });
    }
    catch (error) {
        console.log('error editing pet', error);
    }
}

function* addOwnerSaga(action) {
    try {
        yield axios.post('/owners', action.payload);
        yield put({ type: 'GET_OWNERS' });
    }
    catch (error) {
        console.log('error adding owner', error);
    }
}

const sagaMiddleware = createSagaMiddleWare();

const petsReducer = (state=[],action) => {
    if(action.type === 'SET_PETS') {
        return action.payload;
    }
    return state;
}

const ownersReducer = (state=[],action) => {
    if(action.type === 'SET_OWNERS') {
        return action.payload;
    }
    return state;
}

const storeInstance = createStore(
    combineReducers({
        ownersReducer,
        petsReducer
    }),
    applyMiddleware(sagaMiddleware,logger),
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance} ><App /></Provider>, document.getElementById('root'));

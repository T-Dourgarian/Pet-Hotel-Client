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
    yield takeEvery('DELETE_PET', deletePetSaga);
    yield takeEvery('UPDATE_PET', updatePetSaga);
    yield takeEvery('ADD_OWNER', addOwnerSaga);
    yield takeEvery('GET_OWNERS', getOwnersSaga);
    yield takeEvery('DELETE_OWNER', deleteOwnerSaga);
}

function* petsSaga(action) {
    // axios req to get data
    // call 'SET_PET_INFO' reducer
    //communicates with server route to get pets from database
    console.log('petDetails Saga', action.payload)
    try {
        const petResponse = yield axios.get(`/api/pets`);
        yield put({ type: 'SET_PETS', payload: petResponse.data.data});
        console.log('petsSaga hit with action', petResponse.data);
    } catch(error){
        console.log('error fetching pets', error)
    }
}

function* deletePetSaga(action) {
    try {
        yield axios.delete(`/api/pets/${action.payload}`);
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
        yield console.log(action.payload);
        yield axios.post(`/api/owners/`, {name: action.payload});
        yield put({ type: 'GET_OWNERS' });
    }
    catch (error) {
        console.log('error adding owner', error);
    }
}

function* getOwnersSaga(action) {
    try {
        const owners = yield axios.get('/api/owners');
        yield console.log('owners saga', owners);
        yield put({ type: 'SET_OWNERS', payload: owners.data.data});
    }
    catch (error) {
        console.log('error getting owner', error);
    }
}

function* deleteOwnerSaga(action) {
    try {
        yield axios.delete(`/api/owners/${action.payload}`);
        yield put({ type: 'GET_OWNERS'});
    }
    catch (error) {
        console.log('error getting owner', error);
    }
}

function* addPetSaga(action) {
    try {
        yield axios.post('/api/pets', action.payload)
        yield put({ type: 'GET_PETS' });
    }
    catch (error) {
        yield console.log('error in addPetSaga', error);  
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

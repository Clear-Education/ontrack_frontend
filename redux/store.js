import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/index.js'
import { createWrapper } from 'next-redux-wrapper'
import {saveState, loadState} from './immutableState';

const persistedData = loadState();

const store = createStore(rootReducer, persistedData, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe( function () {
    saveState(store.getState())
  }) 

// crea el store para pasarlo al wrapper
const makeStore = context => store;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore); /*  {debug: true} otro parámetro que puede ponerse para ver la creación del store*/

export default store;
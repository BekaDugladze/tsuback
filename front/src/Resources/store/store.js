// store.js
import { createStore } from 'redux';
import rootReducer from '../reducer/reducer'; // Assuming you have a reducer file

const store = createStore(rootReducer);

export default store;

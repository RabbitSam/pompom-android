import { configureStore } from '@reduxjs/toolkit';
import currentTimerReducer from './currentTimerSlice';


export default configureStore({
    reducer: {
        currentTimer: currentTimerReducer,
    }
});
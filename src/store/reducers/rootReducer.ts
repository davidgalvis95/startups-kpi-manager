import sideNavBarStatusReducer from './sideNavBarStatusReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    sideNavBarStatusReducer,
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

import sideNavBarStatusReducer from './sideNavBarStatusReducer';
import pictureChangeReducer from './pictureChangeReducer';
import kpiReducer from './kpiReducer';
import pymeReducer from './pymeReducer';
import userReducer from './userReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    sideNavBarStatusReducer,
    pictureChangeReducer,
    kpiReducer,
    pymeReducer,
    userReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

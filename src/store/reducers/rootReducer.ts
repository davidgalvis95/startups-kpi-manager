import sideNavBarStatusReducer from './sideNavBarStatusReducer';
import pictureChangeReducer from './pictureChangeReducer';
import kpiReducer from './kpiReducer';
import pymeReducer from './pymeReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    sideNavBarStatusReducer,
    pictureChangeReducer,
    kpiReducer,
    pymeReducer,
    userReducer,
    loginReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

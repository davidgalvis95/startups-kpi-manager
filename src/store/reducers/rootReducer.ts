import sideNavBarStatusReducer from './sideNavBarStatusReducer';
import pictureChangeReducer from './pictureChangeReducer';
import kpiReducer from './kpiReducer';
import pymeReducer from './pymeReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import {combineReducers} from 'redux';
import logoutReducer from './logoutReducer';

const rootReducer = combineReducers({
    sideNavBarStatusReducer,
    pictureChangeReducer,
    kpiReducer,
    pymeReducer,
    userReducer,
    loginReducer,
    logoutReducer,
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

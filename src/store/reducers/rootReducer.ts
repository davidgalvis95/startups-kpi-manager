import sideNavBarStatusReducer from './sideNavBarStatusReducer';
import pictureChangeReducer from './pictureChangeReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    sideNavBarStatusReducer,
    pictureChangeReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

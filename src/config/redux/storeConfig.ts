import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";
import rootReducer from '../../store/reducers/rootReducer'
import { createStore, applyMiddleware } from "redux";


// sideNavBarStatusReducer,
// pictureChangeReducer,
// kpiReducer,
// pymeReducer,
// userReducer,
// loginReducer,
// logoutReducer,
// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist: ['sideNavBarStatusReducer']
//   };

  const persistConfig = {
    key: 'root-state',
    storage: storage,
    // whitelist: ['pictureChangeReducer','kpiReducer', 'pymeReducer','userReducer','loginReducer','logoutReducer']
  };
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// )

// const exampleSlice = createSlice({
//   name: 'example',
//   initialState: {
//     id: uuid(),
//     v1: {},
//   } as ExampleType,
//   reducers: {
//     // ...
//     clearResults() {
//       // Note that this should be left intentionally empty.
// 			// Clearing redux state and localForage happens in rootReducer.ts.
//     },
//   },
// })




export const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store);
export default store;
export {persistor}

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }


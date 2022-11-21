import { createStore } from "redux";
import { Reducers } from "../reducer/Reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import createSensitiveStorage from "redux-persist-sensitive-storage"


// const sensitiveStorage = createSensitiveStorage({
//     keychainService: "myKeychain",
//     sharedPreferencesName: "mySharedPrefs"
// });

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }
   
  const persistStoreReducer = persistReducer(persistConfig, Reducers)

  export let storePersist = createStore(persistStoreReducer)

  export let persistor = persistStore(storePersist)
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducerContacts } from "./contacts/slice";
import { filterReducer } from "./filter/slice";


const persistConfig = {
    key: 'contacts',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducerContacts);

export const rootReducer = {
    contacts: persistedReducer,
    filter: filterReducer,
};
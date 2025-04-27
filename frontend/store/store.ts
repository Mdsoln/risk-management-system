import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import menuReducer from './slices/menuSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import notificationsReducer from './slices/notificationsSlice';

const rootReducer = combineReducers({
    menu: menuReducer,
    theme: themeReducer,
    user: userReducer,
    notifications: notificationsReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['menu', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import galleryReducer from '../features/gallery/gallerySlice';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  gallery: galleryReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

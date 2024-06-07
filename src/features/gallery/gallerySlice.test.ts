import { fetchAllImages, setActiveImage, default as galleryReducer } from './gallerySlice';
import { server } from '../../mocks/server';
import {http, HttpResponse} from 'msw';
import { Image } from '../../commons/interfaces/Image';
import { GalleryState } from '../../commons/interfaces/GalleryState';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';


const initialState: GalleryState = {
  images: [],
  activeImageIndex: -1,
  loading: true,
  errors: undefined,
};

describe('gallerySlice', () => {
  it('should return the initial state', () => {
    expect(galleryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setActiveImage', () => {
    const actual = galleryReducer(initialState, setActiveImage(2));
    expect(actual.activeImageIndex).toEqual(2);
  });

  describe('fetchAllImages thunk', () => {
    it('should handle fetchAllImages.pending', () => {
      const action = { type: fetchAllImages.pending.type };
      const state = galleryReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true, errors: undefined });
    });

    it('should handle fetchAllImages.fulfilled', () => {
      const images: Image[] = [
        { image: 'https://via.placeholder.com/150', description: 'Test Image 1', title: 'Image 1', index: 1 },
        { image: 'https://via.placeholder.com/150', description: 'Test Image 2', title: 'Image 2', index: 2 },
      ];
      const action = { type: fetchAllImages.fulfilled.type, payload: images };
      const state = galleryReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, images });
    });

    it('should handle fetchAllImages.rejected', () => {
      const action = { type: fetchAllImages.rejected.type, error: { message: 'Fetch failed' } };
      const state = galleryReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, errors: 'Fetch failed' });
    });
  });
});

// Thunk tests
describe('fetchAllImages async thunk', () => {
  it('should dispatch fetchAllImages.fulfilled when fetch is successful', async () => {
    server.use(
      http.get('http://54.73.73.228:4369/api/images', () => {
        return HttpResponse.json(
          {
            photo_1: {
              index: 1,
              image: 'https://picsum.photos/id/4/200/300',
              description: 'Image 1',
              title: 'Image 1',
            },
            photo_2: {
              index: 1,
              image: 'https://picsum.photos/id/7/400/300',
              description: 'Image 1',
              title: 'Image 1',
            },
          }, {status: 200}
        );
      })
    );

    const store = configureStore({ reducer: { gallery: galleryReducer } });
    await store.dispatch(fetchAllImages());

    const state = store.getState().gallery;
    expect(state.images).toHaveLength(2);
    expect(state.loading).toBe(false);
    expect(state.errors).toBeUndefined();
  });

  it('should dispatch fetchAllImages.rejected when fetch fails', async () => {
    server.use(
      http.get('http://54.73.73.228:4369/api/images', () => {
        return HttpResponse.json({
          message: 'Something went wrong',
        }, {status: 400})
      })
    );

    const store = configureStore({ reducer: { gallery: galleryReducer } });
    await store.dispatch(fetchAllImages());

    const state = store.getState().gallery;
    expect(state.loading).toBe(false);
    expect(state.errors).toBeDefined();
  });
});

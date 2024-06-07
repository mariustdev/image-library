import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Image} from "../../commons/interfaces/Image.ts";
import {fetchData} from "../../commons/generics/api.ts";
import {GalleryState} from "../../commons/interfaces/GalleryState.ts";

const initialState: GalleryState = {
  images: [],
  activeImageIndex: -1,
  loading: true,
  errors: undefined
};

export const fetchAllImages = createAsyncThunk('gallery/fetchImages', async () => {
  const url = 'http://54.73.73.228:4369/api/images';

  const data = await fetchData<{ [s: string]: Image; }>(url);
  let images: Image[] = [];
  // asc sorting and mapping object to array
  if (data && typeof data === 'object') {
    images = Object.values<Image>(data).sort((image1: Image, image2: Image) => image1.index - image2.index);
  }

  return images;
});

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setActiveImage: (state, action: PayloadAction<number>) => {
      state.activeImageIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllImages.pending, (state) => {
        state.loading = true;
        state.errors = undefined;
      })
      .addCase(fetchAllImages.fulfilled, (state, action: PayloadAction<Image[]>) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchAllImages.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message;
      });
  },
});

export const { setActiveImage } = gallerySlice.actions;
export default gallerySlice.reducer;

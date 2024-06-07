import {Image} from "./Image.ts";

export interface GalleryState {
  images: Image[];
  activeImageIndex: number;
  loading: boolean;
  errors?: string;
}

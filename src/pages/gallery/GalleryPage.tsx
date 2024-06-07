import React, {Fragment, useEffect} from 'react';
import {RootState} from "../../app/store.ts";
import {fetchAllImages, setActiveImage} from "../../features/gallery/gallerySlice.ts";
import GalleryItem from "./components/GalleryItem.tsx";
import {StyledGallery} from "../../commons/styled/Gallery.tsx";
import {useNavigate} from "react-router-dom";
import {ERROR_NO_IMAGES, ERROR_OLD_IMAGES} from "../../commons/constants/Constants.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

const GalleryPage: React.FC = () => {
  const images = useAppSelector((state: RootState) => state.gallery.images);
  const loading = useAppSelector((state: RootState) => state.gallery.loading);
  const errors = useAppSelector((state: RootState) => state.gallery.errors);
  const activeImageIndex = useAppSelector((state: RootState) => state.gallery.activeImageIndex);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllImages());
  }, [dispatch]);

  const handleImageClick = (index: number) => {
    dispatch(setActiveImage(index));
    navigate(`/${index}/photo_${index}`)
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderError = () => {
    let message = '';
    if (images && images.length > 0) {
      message = ERROR_OLD_IMAGES;
    } else {
      message = ERROR_NO_IMAGES;
    }
    return <p style={{color: '#f08f8f'}}>{message}</p>
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      {errors && renderError()}
      <StyledGallery>
        {images?.map((image) => (
          <Fragment key={image.index}>
            <GalleryItem image={image} handleImageClick={handleImageClick} active={activeImageIndex === image.index} />
          </Fragment>
        ))}
      </StyledGallery>
    </div>
  );
};

export default GalleryPage;

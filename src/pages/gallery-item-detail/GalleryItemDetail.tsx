import React, {FC} from 'react';
import {RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {StyledButton} from "../../commons/styled/Button.tsx";
import CustomImage from "../../commons/components/CustomImage.tsx";
import {StyledDetail} from "../../commons/styled/Detail.tsx";
import {useAppSelector} from "../../app/hooks.ts";

const GalleryItemDetail: FC = () => {
  const activeImageIndex = useAppSelector((state: RootState) => state.gallery.activeImageIndex);
  const image = useAppSelector((state: RootState) => state.gallery.images.find((image) => image.index === activeImageIndex));
  const navigate = useNavigate();

  const handleHomeNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  }

  const renderImageContent = () => {
    if (!image) return <p>Image not found</p>

    return (
      <StyledDetail>
        <h2>Gallery Item</h2>
        <div className="image-container">
          <CustomImage url={image.image} alt={image.description}/>
        </div>
        <p>{image.title}</p>
        <p>{image.description}</p>
      </StyledDetail>
    )
  };

  return (
    <div>
      {renderImageContent()}
      <StyledButton onClick={handleHomeNavigation}>Go Home</StyledButton>
    </div>
  );
};

export default GalleryItemDetail;

import {FC} from "react";
import {Image} from "../../../commons/interfaces/Image.ts";
import {StyledCard} from "../../../commons/styled/Card.tsx";
import CustomImage from "../../../commons/components/CustomImage.tsx";

interface GalleryItemProps {
  image: Image;
  handleImageClick: (index: number) => void;
  active: boolean;
}

const GalleryItem: FC<GalleryItemProps> = ({image, handleImageClick, active}) => {

  return (
    <StyledCard data-testid={`image-${image.index}`} className={active ? 'active': ''} onClick={() => handleImageClick(image.index)}>
      <div className="title">{image.title}</div>
      <div className="image-container">
        <CustomImage url={image.image} alt={image.description}/>
      </div>
      <div className="description">{image.description}</div>
    </StyledCard>

  )
}

export default GalleryItem;

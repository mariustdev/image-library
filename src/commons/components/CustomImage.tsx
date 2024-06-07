import {FC} from "react";
import NoImage from "../../assets/no-image.jpg";

interface ImageProps {
  url: string;
  alt?: string;
}
const CustomImage: FC<ImageProps> = ({url, alt = 'No info'}) => {
  return (
    <img src={url} alt={alt} onError={(e) => (e.currentTarget.src = NoImage)} loading={'lazy'} width="100%"/>
  )
}

export default CustomImage;

import { register } from "swiper/element/bundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import cloudinary from "../../assets/cloudinary/cloudConfig";
register();

const Slider = ({ images, imageWidth, imageHeight }) => {
  const alteredImage = (image) => {
    let myImage = cloudinary.image(image);
    myImage.resize(fill().width(imageWidth).height(imageHeight));
    return myImage;
  };

  return (
    <>
      {images.length === 0 ? (
        <FontAwesomeIcon icon={faImage} />
      ) : (
        <swiper-container
          slides-per-view="1"
          navigation="true"
          pagination="true"
          scrollbar="true"
        >
          {images.map((image, index) => {
            return (
              <swiper-slide key={index}>
                <AdvancedImage cldImg={alteredImage(image)} />
              </swiper-slide>
            );
          })}
        </swiper-container>
      )}
    </>
  );
};

export default Slider;

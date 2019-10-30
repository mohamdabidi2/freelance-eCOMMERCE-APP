import React from "react";

import { Gallery, GalleryImage } from "react-gesture-gallery";

const images = [
  "https://i.imgur.com/BKJLgps.jpg",
  "https://i.imgur.com/BKJLgps.jpg",
  "https://i.imgur.com/BKJLgps.jpg",
  "https://i.imgur.com/BKJLgps.jpg",
  "https://i.imgur.com/BKJLgps.jpg"
];

function Slider() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (index === 4) {
        setIndex(0);
      } else {
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  return (
<div className="carousel">
<Gallery

     
      index={index}
      onRequestChange={i => {
        setIndex(i);
      }}
    >
      {images.map(image => (
        <GalleryImage className="image-slider" enableKeyboard="true" enableIndicators="false"   key={image} src={image}  />
      ))}
    </Gallery>
</div>
  );
}

export default Slider

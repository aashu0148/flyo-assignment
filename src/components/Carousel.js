import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props) {
  const settings = {
    className: "slider variable-width",
    speed: 400,
    infinite: false,
    // centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    // autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{}}>
      <Slider {...settings}>
        {props.data.map((item) => (
          <div key={item.id} className="carousel-image">
            <Link to={`/movie/${item.id}`}>
              <img
                style={{ height: "250px" }}
                src={item.poster}
                alt="not found"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;

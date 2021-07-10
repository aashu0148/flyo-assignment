import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function Liked(props) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Navbar />

      <br />
      <br />
      <br />

      <div style={{ display: "flex", flexWrap: "wrap", padding: "20px 30px" }}>
        {props.liked.map((item) => (
          <div
            key={item.id}
            className="carousel-image"
            style={{ margin: "10px" }}
          >
            <Link to={`/movie/${item.id}`}>
              <img
                style={{ height: "350px" }}
                src={item.poster}
                alt="not found"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
  };
};

export default connect(mapStateToProps)(Liked);

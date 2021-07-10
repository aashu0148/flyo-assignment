import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import Navbar from "./Navbar";

function MoviePage(props) {
  const [liked, setLiked] = useState(props.liked);
  const movie = props.movies.find((e) => e.id === props.match.params.id);

  const addToLiked = () => {
    const myLiked = [...liked];
    myLiked.push(movie);
    localStorage.setItem("liked-movies", JSON.stringify(myLiked));
    setLiked(myLiked);
    props.likedAction(myLiked);
  };

  const removeFromLiked = () => {
    const index = liked.findIndex((e) => e.id === movie.id);
    const myLiked = [...liked];
    myLiked.splice(index, 1);
    localStorage.setItem("liked-movies", JSON.stringify(myLiked));
    setLiked(myLiked);
    props.likedAction(myLiked);
  };

  return (
    <div>
      <Navbar />
      <div style={{ position: "relative" }}>
        <img
          src={movie.backdrop}
          className="home_banner"
          style={{
            width: "100%",
          }}
          alt="BANNER"
        />
        <div
          style={{
            width: "50%",
            position: "absolute",
            bottom: "80px",
            left: "0",
            padding: "10px",
          }}
        >
          <h1>{movie.title}</h1>
          <br />
          <p style={{ color: "#ddd" }}>{movie.overview}</p>
          <p style={{ color: "var(--primary-color)" }}>
            IMBD - <span style={{ color: "#fff" }}>{movie.imdb_rating}/10</span>
          </p>
          <p style={{ color: "var(--primary-color)" }}>
            Length - <span style={{ color: "#fff" }}>{movie.length}</span>
          </p>
          <p style={{ color: "var(--primary-color)" }}>
            Release Date -{" "}
            <span style={{ color: "#fff" }}>
              {moment(movie.released_on).format("MMM Do YYYY")}
            </span>
          </p>
          <p style={{ color: "var(--primary-color)" }}>
            Genres -{" "}
            <span style={{ color: "#fff" }}>{movie.genres.join(", ")}</span>
          </p>
          <p style={{ color: "var(--primary-color)" }}>
            Classification -{" "}
            <span style={{ color: "#fff" }}>{movie.classification}</span>
          </p>
          {liked.some((e) => e.id === movie.id) ? (
            <button onClick={removeFromLiked} className="button">
              Remove from Liked
            </button>
          ) : (
            <button onClick={addToLiked} className="button">
              Add to Liked
            </button>
          )}
        </div>
      </div>

      <div style={{ paddingLeft: "10px" }}>
        <h1>Cast</h1>
        {movie.cast.map((e, i) => (
          <li style={{ listStyleType: "square" }} key={i}>
            {e}
          </li>
        ))}
        <br />
        <h1>Director</h1>
        {Array.isArray(movie.director) ? (
          movie.director.map((e, i) => (
            <li style={{ listStyleType: "square" }} key={i}>
              {e}
            </li>
          ))
        ) : (
          <p style={{ color: "#fff" }}>{movie.director}</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likedAction: (liked) => dispatch({ type: "SET_LIKED", liked }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

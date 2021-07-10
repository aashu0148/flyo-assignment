import React from "react";

import Navbar from "./Navbar";
import Carousel from "./Carousel";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const genreKeys = Object.keys(props.genres);
  const randomGenre =
    props.genres[genreKeys[randomBetween(0, genreKeys.length - 1)]];
  const randomMovie = randomGenre[randomBetween(0, randomGenre.length - 1)];

  return (
    <div style={{ position: "relative" }}>
      <Navbar />

      <div style={{ position: "relative" }}>
        <img
          src={randomMovie.backdrop}
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
            bottom: "20%",
            left: "0",
            padding: "10px",
          }}
        >
          <h1>{randomMovie.title}</h1>
          <br />
          <p style={{ color: "#ddd" }}>{randomMovie.overview}</p>
          <p style={{ color: "var(--primary-color)" }}>
            IMBD -{" "}
            <span style={{ color: "#fff" }}>{randomMovie.imdb_rating}/10</span>
          </p>
          <Link to={`/movie/${randomMovie.id}`}>
            <button className="button">More Details</button>
          </Link>
        </div>
      </div>

      <h1 style={{ fontSize: "36px", color: "var(--primary-color)" }}>
        Classification
      </h1>
      {Object.keys(props.classification)
        .sort()
        .map((item, i) => (
          <div key={i}>
            <h2>{item}</h2>
            <Carousel data={props.classification[item]} />
          </div>
        ))}
      <br />
      <h1 style={{ fontSize: "36px", color: "var(--primary-color)" }}>
        Genres
      </h1>
      {Object.keys(props.genres)
        .sort()
        .map((item, i) => (
          <div key={i}>
            <h2>{item}</h2>
            <Carousel data={props.genres[item]} />
          </div>
        ))}
    </div>
  );
}

export default Home;

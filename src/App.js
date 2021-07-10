import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Spinner from "./components/Spinner";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import Liked from "./components/Liked";
import "./App.css";

function App(props) {
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [classification, setClassification] = useState({});
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked-movies")) || [];
    props.likedAction(liked);

    fetch(`https://wookie.codesubmit.io/movies`, {
      headers: {
        authorization: "Bearer Wookie2019",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        const classify = {};
        const myGenres = {};
        setMovies(data.movies);
        data.movies.forEach((item) => {
          item.genres.forEach((e) => {
            myGenres[e] ? myGenres[e].push(item) : (myGenres[e] = [item]);
          });

          classify[item.classification]
            ? classify[item.classification].push(item)
            : (classify[item.classification] = [item]);
        });
        setClassification(classify);
        setGenres(myGenres);

        setLoaded(true);
      })
      .catch((err) => {
        console.log("Error connecting to server.");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {loaded ? (
        <Router>
          <Switch>
            <Route
              path="/movie/:id"
              render={(props) => <MoviePage movies={movies} {...props} />}
            />
            <Route path="/liked">
              <Liked />
            </Route>
            <Route path="/">
              <Home classification={classification} genres={genres} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    likedAction: (liked) => dispatch({ type: "SET_LIKED", liked }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

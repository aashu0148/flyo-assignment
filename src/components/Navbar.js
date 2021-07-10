import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        background: props.transparent ? "transparent" : "rgba(0,0,0,0.3)",
        zIndex: "100",
      }}
    >
      <Grid
        container
        style={{
          margin: "0",
          width: "100%",
        }}
        alignItems="center"
      >
        <Grid item xs={4} sm={3} md={3} lg={2}>
          <Link to="/">
            <h1 style={{ margin: "0 15px" }}>Movies App</h1>
          </Link>
        </Grid>
        <Grid item xs={5} sm={7} md={7} lg={8}>
          <Link to="/liked">Liked</Link>
        </Grid>
        <Grid
          item
          xs={3}
          sm={2}
          md={2}
          lg={2}
          style={{ padding: "0 10px", textAlign: "end" }}
        >
          <button className="button">Signin</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;

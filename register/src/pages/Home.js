import React from "react";
import { Grid } from "semantic-ui-react";

function Home() {
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Register</h1>
        <h4>ACCESS CONTROL</h4>
      </Grid.Row>
      <Grid.Row></Grid.Row>
    </Grid>
  );
}

export default Home;

import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Button } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const { loading, data: { getClocks: clocks } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  const handleItemClick = () => logout();

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Clocks</h1>
      </Grid.Row>
      <Grid.Row>
        {user && <Grid.Column></Grid.Column>}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {clocks &&
              clocks.map((clock) => (
                <Grid.Column key={clock.id} style={{ marginBottom: 20 }}>
                  <p>{clock.timeRegistered}</p>
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
      <Grid.Row>
        <Button onClick={handleItemClick} as={Link} to="/login">
          Logout
        </Button>
      </Grid.Row>
    </Grid>
  );
}

export default AdminDashboard;

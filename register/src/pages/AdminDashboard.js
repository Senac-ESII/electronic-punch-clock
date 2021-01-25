import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";

function AdminDashboard() {
  const FETCH_CLOCKS_QUERY = gql`
    {
      getClocks {
        id
        userId
        timeRegistered
      }
    }
  `;

  const { user, logout } = useContext(AuthContext);
  const { loading, data: { getClocks: clocks } = {} } = useQuery(
    FETCH_CLOCKS_QUERY
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
                  <label class="">{clock.username}</label>
                  <label class="">{clock.timeRegistered.substr(0, 10)}</label>
                  <label class="">{clock.timeRegistered.substr(10)}</label>
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

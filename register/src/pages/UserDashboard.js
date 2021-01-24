import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import { AuthContext } from "../context/auth";

function UserDashboard() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getClocksById: clocks } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
  console.log("clocls", clocks);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Clocks</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <p>carolzinha</p>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {clocks &&
              clocks.map((clock) => (
                <Grid.Column key={clock.id} style={{ marginBottom: 20 }}>
                  <p>carol</p>
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default UserDashboard;

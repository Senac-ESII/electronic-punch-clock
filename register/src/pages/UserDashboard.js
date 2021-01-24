import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button, Grid, Transition, Modal } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import { AuthContext } from "../context/auth";

function UserDashboard() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getClocksById: clocks } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

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
        {/* <Button as="div" labelPosition="right" onClick={sendClock}>
          <Button color="blue" basic>
            button
          </Button>
        </Button> */}{" "}
        <Modal
          trigger={<Button>Register</Button>}
          header="Novo Registro"
          content="Call Benjamin regarding the reports."
          actions={[{ key: "done", content: "Done", positive: true }]}
        />
      </Grid.Row>
    </Grid>
  );
}

export default UserDashboard;

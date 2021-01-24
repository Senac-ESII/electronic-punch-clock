import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Grid,
  Transition,
  Modal,
  Header,
  Label,
  Form,
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function UserDashboard() {
  const FETCH_CLOCKS_QUERY = gql`
    {
      getClocksById {
        id
        userId
        timeRegistered
      }
    }
  `;

  const { user, logout } = useContext(AuthContext);
  let { username } = user;
  const { loading, data: { getClocksById: clocks } = {} } = useQuery(
    FETCH_CLOCKS_QUERY
  );
  console.log("CLOCKS: ", clocks);

  const { values, onChange, onSubmit } = useForm(createClockCallback, {
    date: "",
    time: "",
  });

  const CREATE_CLOCK_MUTATION = gql`
    mutation createClock($date: String!, $time: String!) {
      createClock(date: $date, time: $time) {
        id
        userId
        timeRegistered
      }
    }
  `;

  const [createClock, { error }] = useMutation(CREATE_CLOCK_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_CLOCKS_QUERY,
      });
      data.createClock = [result.data.createClock];
      proxy.writeQuery({ query: FETCH_CLOCKS_QUERY, data });
      values.date = "";
      values.time = "";
    },
  });
  function createClockCallback() {
    createClock();
  }

  const handleItemClick = () => logout();

  return (
    <Grid columns={5}>
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
                  {console.log(clock.id)}
                  <p>{clock.timeRegistered}</p>
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
        <Modal
          trigger={<Button>Register</Button>}
          header={
            <>
              <Header as="h3">Novo Registro</Header>
              <Label>Colaborador</Label>
              <Header as="h4">{username}</Header>
            </>
          }
          content={
            <>
              <Label pointing="below">Data/Hora</Label>
              <Form onSubmit={onSubmit}>
                <Form.Field>
                  <Form.Input
                    placeholder="___/___/___"
                    name="date"
                    onChange={onChange}
                    value={values.date}
                    error={error ? true : false}
                  ></Form.Input>
                  <Form.Input
                    placeholder="___:___"
                    name="time"
                    onChange={onChange}
                    value={values.time}
                    error={error ? true : false}
                  ></Form.Input>
                  <Button type="submit" color="teal">
                    Submit
                  </Button>
                </Form.Field>
              </Form>
            </>
          }
        />
        <Button onClick={handleItemClick} as={Link} to="/login">
          Logout
        </Button>
      </Grid.Row>
    </Grid>
  );
}

export default UserDashboard;

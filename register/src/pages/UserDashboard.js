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
// import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import SmallLogo from "../assets/imgs/smallLogo.svg";
import Logout from "../assets/imgs/logout.svg";
// import "./styles.css";

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
    <div className="ui grid">
      <div className="two wide column">
        <div class="ui small image">
          <img src={SmallLogo} alt="logo" />
        </div>
        <div className="ui hidden divider"></div>
        <div className="logout-button">
          <Button className="ui big button" onClick={handleItemClick}>
            <img src={Logout} alt="logout" />
          </Button>
        </div>
      </div>
      <div className="fourteen wide column">
        <Modal
          trigger={<Button>Registrar</Button>}
          header={
            <>
              <Header as="h3">Novo Registro</Header>
              <Label>Colaborador</Label>
              <Header as="h4">{user.username}</Header>
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

        {user && <Grid.Column></Grid.Column>}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {clocks &&
              clocks.map((clock) => (
                <div className="ui grid">
                  <div className="ui fluid card">
                    <div key={clock.id} style={{ marginBottom: 20 }}>
                      <div className="four wide column">
                        <h4>{user.username}</h4>
                      </div>
                      <div className="four wide column">
                        <h5>{clock.timeRegistered.substr(0, 9)}</h5>
                      </div>
                      <div className="four wide column">
                        <h5>{clock.timeRegistered.substr(10)}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Transition.Group>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;

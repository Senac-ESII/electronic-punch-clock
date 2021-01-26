import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button, Form, Grid, List, Modal } from "semantic-ui-react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import { useForm } from "../util/hooks";
import ListCard from "../components/ListCard";
import { AuthContext } from "../context/auth";
import SmallLogo from "../assets/imgs/smallLogo.svg";
import Logout from "../assets/imgs/logout.svg";
import Registers from "../assets/imgs/registers.svg";
import "./styles.css";

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
      <div className="side-bar column">
        <div class="ui small image">
          <img src={SmallLogo} alt="logo" className="logo-image" />
        </div>
        <div className="ui divider"></div>
        <Button className="dash-button ui button">
          <img src={Registers} alt="registro" />
        </Button>
        <div className="ui divider"></div>
        <Button
          className="logout-button ui big button"
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          <img src={Logout} alt="logout" />
        </Button>
      </div>
      <div className="thirteen wide column">
        <Modal
          trigger={
            <button class="colored-button ui button">
              <span className="button-text">Registrar</span>
            </button>
          }
          content={
            <div class="ui date-form">
              <div class="register-label">
                <h3>Novo Registro</h3>
              </div>
              <div className="ui divider"></div>
              <div class="register-label">
                <label>Colaborador</label>
              </div>
              <div class="register-name">
                <h3>{user.name}</h3>
              </div>
              <div class="register-label">
                <label for="time">Data/Hora</label>
              </div>
              <div class="ui input date-time-input">
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
                    <Button type="submit" color="green">
                      Submit
                    </Button>
                  </Form.Field>
                </Form>
              </div>
            </div>
          }
        />
        <div className="three column row">
          {user && (
            <div class="ui dash-label">
              <List divided verticalAlign="middle">
                <List.Item>
                  <div className="clocks">
                    <Grid columns={3}>
                      <Grid.Row>
                        <Grid.Column>
                          <b>Colaborador</b>
                        </Grid.Column>
                        <Grid.Column>
                          <b>Data</b>
                        </Grid.Column>
                        <Grid.Column>
                          <b>Hora</b>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                </List.Item>
              </List>
            </div>
          )}
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <div>
              {clocks &&
                clocks.map((clock) => (
                  <div class="ui segment ">
                    <ListCard clock={clock} user={user} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserDashboard;

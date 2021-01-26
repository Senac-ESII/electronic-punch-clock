import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Button, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import SmallLogo from "../assets/imgs/smallLogo.svg";
import Logout from "../assets/imgs/logout.svg";
import Registers from "../assets/imgs/registers.svg";
import ListCard from "../components/ListCard";
import "./styles.css";
/**
 * dashboard used for admins to manage employees electronic clock
 */
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
  /**
   * When receive click event, trigger the logout function.
   */
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
        {user && (
          <div class="ui admin-dash-label">
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
                <div class="ui segment">
                  <ListCard clock={clock} user={user} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

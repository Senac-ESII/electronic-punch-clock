import React, { useContext, useState } from "react";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import Logo from "../assets/imgs/logo.svg";
// import "./styles.css";
import { Link } from "react-router-dom";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        role
        token
      }
    }
  `;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div class="ui container" style={{ backgroundColor: "#424242" }}>
      <div class="ui container">
        <div className="ui vertically divided grid">
          <div className="middle aligned two column row raised">
            <div className="column">
              <div className="centered">
                <img ui medium image src={Logo} alt="logo" />
              </div>
            </div>
            <div className="column">
              <div className="form">
                <Form
                  onSubmit={onSubmit}
                  noValidate
                  className={loading ? "loading" : ""}
                >
                  <span className="span-text">Login</span>
                  <Form.Input
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                  />
                  <span className="span-text">Senha</span>
                  <Form.Input
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                  />
                  <div class="login-button">
                    <button
                      type="submit"
                      class="ui big button"
                      as={Link}
                      to="/dashboard"
                    >
                      <span className="login-button-text">Login</span>
                    </button>
                  </div>
                </Form>
                {Object.keys(errors).length > 0 && (
                  <div className="ui error message">
                    <ul className="list">
                      {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

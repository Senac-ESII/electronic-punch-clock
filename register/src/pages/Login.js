import React, { useContext, useState } from "react";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import Logo from "../assets/imgs/logo.svg";
import "./styles.css";
import { Link } from "react-router-dom";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        name
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
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email ? true : false}
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
                  <button
                    type="submit"
                    class="colored-button ui big button"
                    as={Link}
                    to="/dashboard"
                  >
                    <span className="button-text">Login</span>
                  </button>
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

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/authRoute";

import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <AuthRoute exact path="/login" component={Login} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
/**
 * defines de initial state of user as null
 */
const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

/**
 * Authentication provider
 * @param {props} props
 */
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  /**
   * Set the jwt token received from user to the local storage
   * @param {object} userData
   */
  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  /**
   * Delete de current jwt token from local storage
   */
  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

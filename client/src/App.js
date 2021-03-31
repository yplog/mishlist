import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import User from "./pages/user";
import { AuthContext } from "../src/context/auth-context";
import { useAuth } from "../src/hooks/auth-hook";

const App = () => {
  const { token, login, logout, user } = useAuth();

  let routes;
  if (token && user) {
    routes = (
      <Switch>
        <Route path="/u/:username" exact>
          <User />
        </Route>

        <Redirect to={`/u/${user.userName}`} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/u/:username">
          <User />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;

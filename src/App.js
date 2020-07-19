import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import Error from "./Error";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./LoginForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LoginForm} />
        <Route path="/shop" />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;

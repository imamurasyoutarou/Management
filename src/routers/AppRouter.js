import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EntryForm from "../components/EntryForm";
import Confirmation from "../components/Confirmation";
import Login from "../components/Login";
import Management from "../components/Management";
import Detail from "../components/Detail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <EntryForm />} />
        <Route path="/Confirmation" render={() => <Confirmation />} />
        <Route path="/Login" render={() => <Login />} />
        <Route path="/Management" render={() => <Management />} />
        <Route path="/Detail" render={() => <Detail />} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EntryForm from "../components/EntryForm";
import Confirmation from "../components/Confirmation";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <EntryForm />} />
        <Route path="/Confirmation" render={() => <Confirmation />} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

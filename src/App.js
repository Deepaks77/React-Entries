import React from "react";
import SignIn from "./components/SignIn/SignIn";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route exact path="/" component={AppDrawer} />
            <Route exact path="/login" component={SignIn} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;

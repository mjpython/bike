import React, { PureComponent } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Nomatch from "./pages/nomatch";
import Login from "./pages/login";
import Admin from "./admin";
import Buttons from "./pages/ui/buttons";
import App from "./App";
import Home from "./pages/home";
export default class IRouter extends PureComponent {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() => (
              <Admin>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route component={Nomatch} />
                </Switch>
              </Admin>
            )}
          />
          {/* <Route component={Nomatch} /> */}
        </App>
      </HashRouter>
    );
  }
}

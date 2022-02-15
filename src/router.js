import React, { PureComponent } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Nomatch from "./pages/nomatch";
import Login from "./pages/login";
import Admin from "./admin";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import App from "./App";
import Home from "./pages/home";
import Loading from "./pages/ui/loadings";
import Notices from "./pages/ui/notices";
import Message from "./pages/ui/messages";
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
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loadings" component={Loading} />
                  <Route path="/ui/notification" component={Notices} />
                  <Route path="/ui/messages" component={Message} />
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

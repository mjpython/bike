import React, { PureComponent } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Tabbs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousel";
import Loginn from "./pages/forms/login";
import Register from "./pages/forms/register";
import Basictable from "./pages/table/basicTable";
import Hightable from "./pages/table/highTable";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./common";
import User from "./pages/user";
import Detail from "./pages/order/detail";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echats/bar";
import Pie from "./pages/echats/pie";
import Line from "./pages/echats/line";
import Rich from "./pages/rich";
import Permission from "./pages/permission";
export default class IRouter extends PureComponent {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/common"
              render={() => (
                <Common>
                  <Route
                    path="/common/order/detail/:orderId"
                    component={Detail}
                  />
                </Common>
              )}
            />
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
                    <Route path="/ui/tabs" component={Tabbs} />
                    <Route path="/ui/gallery" component={Gallery} />
                    <Route path="/ui/carousel" component={Carousels} />
                    <Route path="/form/login" component={Loginn} />
                    <Route path="/form/reg" component={Register} />
                    <Route path="/table/basic" component={Basictable} />
                    <Route path="/table/high" component={Hightable} />
                    <Route path="/city" component={City} />
                    <Route path="/order" component={Order} />
                    <Route path="/user" component={User} />
                    <Route path="/bikeMap" component={BikeMap} />
                    <Route path="/charts/bar" component={Bar} />
                    <Route path="/charts/pie" component={Pie} />
                    <Route path="/charts/line" component={Line} />
                    <Route path="/rich" component={Rich} />
                    <Route path="/permission" component={Permission} />
                    {/* <Route component={Nomatch} /> */}
                    <Redirect to="/home" />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

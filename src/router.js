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
export default class IRouter extends PureComponent {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/admin"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/admin/home" component={Home} />
                    <Route path="/admin/ui/buttons" component={Buttons} />
                    <Route path="/admin/ui/modals" component={Modals} />
                    <Route path="/admin/ui/loadings" component={Loading} />
                    <Route path="/admin/ui/notification" component={Notices} />
                    <Route path="/admin/ui/messages" component={Message} />
                    <Route path="/admin/ui/tabs" component={Tabbs} />
                    <Route path="/admin/ui/gallery" component={Gallery} />
                    <Route path="/admin/ui/carousel" component={Carousels} />
                    <Route path="/admin/form/login" component={Loginn} />
                    <Route path="/admin/form/reg" component={Register} />
                    <Route path="/admin/table/basic" component={Basictable} />
                    <Route path="/admin/table/high" component={Hightable} />
                    <Route path="/admin/city" component={City} />
                    <Route path="/admin/order" component={Order} />
                    <Route path="/admin/user" component={User} />
                    <Route path="/admin/bikeMap" component={BikeMap} />
                    <Route path="/admin/charts/bar" component={Bar} />
                    <Route path="/admin/charts/pie" component={Pie} />
                    <Route path="/admin/rich" component={Rich} />
                    {/* <Route component={Nomatch} /> */}
                  </Switch>
                </Admin>
              )}
            />
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
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

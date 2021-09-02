import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { DetailsDidactico } from "../views/DetailsDidactico";
import { FormNewDidactico } from "../views/FormNewDidactico";
import { Login } from "../views/Login";
import { SearchDidactico } from "../views/SearchDidactico";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path='/'  component={SearchDidactico} />
                    <PrivateRoute exact path='/agregar'  component={FormNewDidactico} />
                    <PrivateRoute exact path='/detalles' component={DetailsDidactico} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
        </Router>
        
    )
}

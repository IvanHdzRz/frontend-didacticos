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

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/'>
                        <SearchDidactico />
                    </Route>
                    <Route exact path='/agregar' >
                        <FormNewDidactico />
                    </Route>
                    <Route exact path='/detalles'>
                        <DetailsDidactico tipo='mapa' numero='2' />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

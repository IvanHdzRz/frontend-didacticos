import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  
} from "react-router-dom";
import AppContext from "../context/appContext";
import PERMISSIONS from "../types/appPermissions";
import { DetailsDidactico } from "../views/DetailsDidactico";
import { FormNewDidactico } from "../views/FormNewDidactico";
import { Login } from "../views/Login";
import { SearchDidactico } from "../views/SearchDidactico";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
    const{state}= useContext(AppContext)
    const {authToken}=state
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" >
                        {authToken? <Redirect to="/" />:<Login/>}
                    </Route>
                    <PrivateRoute 
                        exact 
                        path='/'  
                        component={SearchDidactico} 
                    />
                    <PrivateRoute 
                        exact 
                        path='/agregar'  
                        component={FormNewDidactico} 
                        routePermission={PERMISSIONS.CREATE} />
                    <PrivateRoute 
                        exact 
                        path='/detalles' 
                        component={DetailsDidactico} 
                    />
                </Switch>
            </div>
        </Router>
        
    )
}

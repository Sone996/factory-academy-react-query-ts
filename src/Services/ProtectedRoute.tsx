import React, { useEffect, useContext, ComponentElement } from "react";
import { Route, useHistory } from "react-router-dom";

import { AppContext } from "../Context/AppProvider";

import { authService } from "../Modules/AuthModule/Auth.service";
import { useFetchActiveUser } from "./Router.service";


export const ProtectedRoute: React.FC<any> = ({ component: Component, setUser, ...rest }) => {
    const history = useHistory();
    
    // eslint-disable-next-line
    const [contextState, dispatch] = useContext(AppContext);

    useFetchActiveUser();

    useEffect(() => {
        if (!authService.isLogged()) {
            history.push('/login');
        }
    }, []);

    if (!contextState.user) {
        return null;
    }

    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )} />
    );
}
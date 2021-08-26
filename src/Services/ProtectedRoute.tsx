import React, { useContext, memo } from "react";
import { Route } from "react-router-dom";

import { AppContext } from "../Context/AppProvider";

//import { authService } from "../Modules/AuthModule/Auth.service";
import { useFetchActiveUser } from "./Router.service";


export const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
    //const history = useHistory();
    
    const [contextState] = useContext(AppContext);

    useFetchActiveUser();

    // useEffect(() => {
    //     if (!authService.isLogged()) {
    //         console.log('jel sam ovde?')
    //         history.push('/login');
    //     }
    // }, [history]);

    if (!contextState.user) {
        return null;
    }

    return (
        <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    );
}

export default memo(ProtectedRoute);
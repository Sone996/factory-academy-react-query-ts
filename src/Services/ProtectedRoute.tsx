import { useEffect, useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../Modules/AuthModule/Auth.context";

import { authService } from "../Modules/AuthModule/Auth.service";


function ProtectedRoute({ component: Component, setUser, ...rest}: any) {
    const history = useHistory();
    const user = useContext(AuthContext);

    useEffect(() => {
        if(!authService.fetchActiveAccount()) {
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        async function fetch() {
            try {
                
            } catch (error) {
                
            }
        }
    })
}
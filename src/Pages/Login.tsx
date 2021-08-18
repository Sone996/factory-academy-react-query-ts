import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { authService } from "../Modules/AuthModule/Auth.service";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context/AppProvider";
import { ActionTypes } from "../Context/Reducers/App/AppProvider.types";

const loginFormTemlate = {
    email: '',
    password: '',
}
const registerFormTemplate = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
}

const Login: React.FC = () => {

    // eslint-disable-next-line
    const [contextState, dispatch] = useContext(AppContext);

    const [loginForm, setLoginForm] = useState(loginFormTemlate);
    const [registerForm, setRegisterForm] = useState(registerFormTemplate);
    const [register, setRegister] = useState(false);
    const history = useHistory();

    const toggleForm = () => {
        setRegister(!register);
    }

    const loginSubmit = async () => {
        loginMutation.mutate(loginForm);
    }

    const registerAction = () => {
        console.log(registerAction);
        setLoginForm({
            ...loginForm,
            email: registerForm.email,
            password: registerForm.password
        })
        registerMutation.mutate(registerForm);
    };

    const loginMutation = useMutation((val: any) => authService.login(val), {
        onMutate: () => {
            dispatch({
                type: ActionTypes.SET_LOADER,
                payload: true
            });
        },
        onSuccess: (response: any) => {
            dispatch({
                type: ActionTypes.SET_LOADER,
                payload: false
            });
            dispatch({
                type: ActionTypes.SET_USER,
                payload: response.data
            });
            if(response.data.role === 'teacher') {
                history.push('/teacher-home');
            } else {
                history.push('/teacher-home');
            }
        }
    });

    const registerMutation = useMutation((val: any) => authService.register(val), {
        onMutate: () => {
            dispatch({
                type: ActionTypes.SET_LOADER,
                payload: true
            });
        },
        onSuccess: (response: any) => {
            dispatch({
                type: ActionTypes.SET_LOADER,
                payload: false
            });
            dispatch({
                type: ActionTypes.SET_USER,
                payload: response.data
            });
            loginMutation.mutate(loginForm);
        }
    })

    const inputLoginHandler = (event: any) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        })
    }

    const inputRegisterHandler = (event: any) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="flex items-center justify-center h-full w-full">
            {!register ?
                //login form
                <div className="flex flex-col w-4/12 border h-2/3 p-4">
                    <div className="flex justify-center">
                        <span className="text-3xl">Login</span>
                    </div>
                    <div className="flex flex-col justify-center mt-8">
                        <span>Email</span>
                        <input
                            className="input"
                            type="text"
                            name="email"
                            value={loginForm.email}
                            onChange={inputLoginHandler}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-4">
                        <span>Password</span>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={inputLoginHandler}
                        />
                    </div>
                    <div className="flex mt-4 justify-between">
                        <div className="button bg-blue-500 w-1/3" onClick={loginSubmit}>Login</div>
                        <div className="button bg-darkGreen w-1/3" onClick={toggleForm}>
                            Register
                        </div>
                    </div>
                </div>
                :
                //register form
                <div className="flex flex-col w-4/12 border h-2/3 p-4">
                    <div className="flex justify-center">
                        <span className="text-3xl">Register</span>
                    </div>
                    <div className="flex flex-col justify-center mt-8">
                        <span>First Name</span>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={registerForm.name}
                            onChange={inputRegisterHandler}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-8">
                        <span>Last Name</span>
                        <input
                            className="input"
                            type="text"
                            name="surname"
                            autoComplete="off"
                            value={registerForm.surname}
                            onChange={inputRegisterHandler}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-8">
                        <span>Email</span>
                        <input
                            className="input"
                            type="text"
                            name="email"
                            autoComplete="off"
                            value={registerForm.email}
                            onChange={inputRegisterHandler}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-8">
                        <span>Password</span>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={registerForm.password}
                            onChange={inputRegisterHandler}
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <div>
                            <input type="radio" name="role" value="student" onChange={inputRegisterHandler} />
                            <label htmlFor="student">Student</label>
                        </div>
                        <div>
                            <input type="radio" name="role" value="teacher" onChange={inputRegisterHandler} />
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                    </div>
                    <div className="flex mt-4 justify-between">
                        <div className="button bg-darkRed w-1/3" onClick={toggleForm}>
                            Go Back
                        </div>
                        <div className="button bg-darkGreen w-1/3" onClick={registerAction}>
                            Register
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;
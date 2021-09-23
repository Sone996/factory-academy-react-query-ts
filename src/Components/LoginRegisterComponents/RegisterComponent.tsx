import { FC, useContext, useState } from "react";
import { useMutation } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { authService } from "../../Modules/AuthModule/Auth.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";
import { LoginHook } from "../CustomHooks/LoginHook";
import { IRegister, ILogin } from '../../Services/Interfaces';

const registerFormTemplate: IRegister = {
  name: "",
  surname: "",
  email: "",
  password: "",
  role: "",
};

const loginFormDefault: ILogin = {
  email: "",
  password: "",
};

const RegisterComponent: FC<{ toggle: () => void }> = ({ toggle }) => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);
  const [registerForm, setRegisterForm] = useState(registerFormTemplate);
  const [loginForm, setLoginForm] = useState(loginFormDefault);
  const useLogin = LoginHook();

  const inputRegisterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "email" || event.target.name === "password") {
      setLoginForm({
        ...loginForm,
        [event.target.name]: event.target.value,
      });
    }
  };

  const registerMutation = useMutation(
    (val: any) => authService.register(val),
    {
      onMutate: () => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          payload: true,
        });
      },
      onError: (err: any) => {
        setRegisterForm(registerFormTemplate);
        dispatch({
          type: ActionTypes.SET_LOADER,
          payload: false,
        });
        errorMsg(notificationMsg(err, null));
      },
      onSuccess: (response: any) => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          payload: false,
        });
        useLogin.mutate(loginForm);
      },
    }
  );

  const registerAction = () => {
    registerMutation.mutate(registerForm);
  };

  return (
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
          <input
            type="radio"
            name="role"
            value="student"
            onChange={inputRegisterHandler}
          />
          <label htmlFor="student">Student</label>
        </div>
        <div>
          <input
            type="radio"
            name="role"
            value="teacher"
            onChange={inputRegisterHandler}
          />
          <label htmlFor="teacher">Teacher</label>
        </div>
      </div>
      <div className="flex mt-4 justify-between">
        <div className="button bg-darkRed w-1/3" onClick={() => toggle()}>
          Go Back
        </div>
        <div className="button bg-darkGreen w-1/3" onClick={registerAction}>
          Register
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;

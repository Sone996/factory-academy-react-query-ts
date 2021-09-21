import { FC, useContext } from "react";
import logo from "../../assets/images/factoryww.png";
import { AppContext } from "../../Context/AppProvider";

import "../../App.scss";

const Loader: FC = () => {
  const [contextState] = useContext(AppContext);

  if (!contextState.loader) {
    return null;
  }

  return (
    <div className="modal-overlay fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
      <div className="w-1/4 h-1/4 flex">
        <img src={logo} alt="logo" className="" />
      </div>
    </div>
  );
};

export default Loader;

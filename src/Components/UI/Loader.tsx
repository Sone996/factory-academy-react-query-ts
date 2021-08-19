import { FC, useContext } from "react";

import { AppContext } from "../../Context/AppProvider";

// import { useAppContext } from '../../contexts/AppProvider'

const Loader: FC = () => {
    
    const [contextState] = useContext(AppContext);

    const classObj: any = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'red'
    }

    if (!contextState.app.loader) {
        return null;
    }

    return (
        <div style={ classObj }></div>
    )
}


export default Loader;
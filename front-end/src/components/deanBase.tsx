
import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes } from "react-router-dom";
import DeanHome from "./dean-home/deanHome";


let DeanBase = () => {
    return (
        <GlobalContext.Consumer>
            {context => (

                <Routes>
                    <Route path="/" element={<DeanHome context={context} />} />
                </Routes>
            )}
        </GlobalContext.Consumer>
    );
}


export default DeanBase;
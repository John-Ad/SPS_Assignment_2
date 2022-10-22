
import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes } from "react-router-dom";
import DeanHome from "./dean-home/deanHome";
import DeanStaffPage from "./dean-staff-page/deanStaffPage";
import DeanStaffViewPage from "./dean-staff-view-page/deanStaffViewPage";


let DeanBase = () => {
    return (
        <GlobalContext.Consumer>
            {context => (

                <Routes>
                    <Route path="/" element={<DeanHome context={context} />} />
                    <Route path="/staff" element={<DeanStaffPage context={context} />} />
                    <Route path="/staff/:staffId" element={<DeanStaffViewPage context={context} />} />
                </Routes>
            )}
        </GlobalContext.Consumer>
    );
}


export default DeanBase;
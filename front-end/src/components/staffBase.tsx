
import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes } from "react-router-dom";
import StaffCourses from "./staff-courses/staffCourses";


let StaffBase = () => {
    return (
        <GlobalContext.Consumer>
            {context => (

                <Routes>
                    <Route path="" element={<div>Staff home</div>} />

                    <Route path="courses/" element={<StaffCourses staffId={10} context={context} />} />
                </Routes>
            )}
        </GlobalContext.Consumer>
    );
}


export default StaffBase;
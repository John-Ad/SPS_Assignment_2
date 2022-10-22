
import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes } from "react-router-dom";
import StaffCourses from "./staff-courses/staffCourses";
import StaffAdminTasksPage from "./staff-admin-tasks-page/staffAdminTasksPage";


let StaffBase = () => {
    return (
        <GlobalContext.Consumer>
            {context => (

                <Routes>
                    <Route path="" element={<div>Staff home</div>} />

                    <Route path="courses/" element={<StaffCourses staffId={10} context={context} />} />
                    <Route path="admin-tasks/" element={<StaffAdminTasksPage staffId={10} context={context} />} />
                </Routes>
            )}
        </GlobalContext.Consumer>
    );
}


export default StaffBase;
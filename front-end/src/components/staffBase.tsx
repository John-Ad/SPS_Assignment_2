
import { GlobalContext } from "../contexts/globalContext";
import { Route, Routes } from "react-router-dom";
import StaffCourses from "./staff-courses/staffCourses";
import StaffAdminTasksPage from "./staff-admin-tasks-page/staffAdminTasksPage";
import StaffResearch from "./staff-research/staffResearch";
import StaffOutreach from "./staff-outreach/staffOutreach";
import StaffHome from "./staff-home/staffHome";


let StaffBase = () => {
    return (
        <GlobalContext.Consumer>
            {context => (

                <Routes>
                    <Route path="" element={<StaffHome context={context} staffId={10} />} />

                    <Route path="courses/" element={<StaffCourses staffId={10} context={context} />} />
                    <Route path="admin-tasks/" element={<StaffAdminTasksPage staffId={10} context={context} />} />
                    <Route path="research/" element={<StaffResearch staffId={10} context={context} />} />
                    <Route path="outreach/" element={<StaffOutreach staffId={10} context={context} />} />
                </Routes>
            )}
        </GlobalContext.Consumer>
    );
}


export default StaffBase;
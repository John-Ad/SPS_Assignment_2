import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { IAdminTask, ICourse, IGlobalContext, IResponse, IStaffAdminTask, IStaffCourse, IUser } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./staffAdminTasksPage.css"



interface IProps {
    context: IGlobalContext,
    staffId: number
}

const StaffAdminTasksPage = (props: IProps) => {


    const [loading, setLoading] = useState(false);
    const [staffAdminTasks, setStaffAdminTasks] = useState<IStaffAdminTask[]>([]);

    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getStaffAdminTasks();
    }, []);


    //----   GET STAFF ADMIN TASKS    ----
    const getStaffAdminTasks = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_ALL_ADMIN_TASKS_FOR_STAFF.toString();
        qry = qry.replace("{staffId}", props.staffId.toString());
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffAdminTasks(result.data);
        console.log(result.data);
    }

    return (
        <div className="full-size">
            <div className="full-size">
                <TableComponent
                    title="Administrative tasks"
                    context={props.context}

                    ids={[...staffAdminTasks]}
                    headerValues={["Id", "Name"]}
                    data={
                        staffAdminTasks.map((task, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.ID, value: task.AdminTaskId.toString() },
                                { type: TABLE_DATA_TYPE.STRING, value: `${task.AdminTask.Name}` },
                            ];
                            return {
                                colValues: colVals
                            }
                        })
                    }
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default StaffAdminTasksPage;
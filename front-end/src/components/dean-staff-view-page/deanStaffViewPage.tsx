import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { IAdminTask, ICourse, IGlobalContext, IResponse, IStaffAdminTask, IStaffCourse, IUser } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./deanStaffViewPage.css"

interface INewInput {
    Task: ISelect,
}

interface IProps {
    context: IGlobalContext,
}

const DeanStaffViewPage = (props: IProps) => {

    const params = useLocation();
    const staff = (params.state as IUser);

    const [loading, setLoading] = useState(false);
    const [staffAdminTasks, setStaffAdminTasks] = useState<IStaffAdminTask[]>([]);

    const [adding, setAdding] = useState(false);
    const [newStaffTask, setNewStaffTask] = useState<INewInput>({
        Task: {
            ISelect: "ISelect",
            key: "Course_Id",
            values: [],
            value: 0
        }
    });
    const [adminTasks, setAdminTasks] = useState<IAdminTask[]>([]);

    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getAdminTasks();
        getStaffAdminTasks();
    }, []);

    // ON TASKS CHANGE
    useEffect(() => {
        mapCoursesForInput();
    }, [adminTasks]);

    // MAP TASKS FOR INPUT
    const mapCoursesForInput = () => {
        let adminTasksShort = adminTasks.map((c) => {
            return {
                value: c.Id,
                name: `${c.Name}`
            }
        });

        setNewStaffTask({
            Task: {
                ISelect: "ISelect",
                key: "Task",
                values: adminTasksShort,
                value: (adminTasksShort.length > 0) ? adminTasksShort[0].value : 0
            }
        })
    }

    //----   GET STAFF ADMIN TASKS    ----
    const getStaffAdminTasks = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_ALL_ADMIN_TASKS_FOR_STAFF.toString();
        qry = qry.replace("{staffId}", staff.Id.toString());
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffAdminTasks(result.data);
        console.log(result.data);
    }

    //----   GET ADMIN TASKS    ----
    const getAdminTasks = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_ALL_ADMIN_TASKS.toString();
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setAdminTasks(result.data);
    }

    //----   ADD STAFF TASK   ----
    const add = async (data: INewInput): Promise<boolean> => {

        if (data.Task.value === 0) {
            errorToast("Choose a task");
            return false;
        }

        let dataToSend = {
            staffId: staff.Id,
            taskId: data.Task.value
        }

        const result: IResponse = await Connection.postRequest(POST_ENDPOINT.ADD_STAFF_ADMIN_TASK, dataToSend, {});
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return false;
        }

        successToast("success", true);
        getStaffAdminTasks();
        setAdding(false);
        return true;
    }

    //----   ON DELETE   ----
    const onDelete = async (data: IStaffAdminTask) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_STAFF_ADMIN_TASK.toString();
        qry = qry.replace("{staffId}", staff.Id.toString());
        qry = qry.replace("{taskId}", data.AdminTaskId.toString());
        console.log(qry);
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getStaffAdminTasks();
    }

    return (
        <div className="full-size">
            <h2 className="hor-center" style={{
                width: "fit-content"
            }}>
                {`${staff.First_Name} ${staff.Last_Name}`}
            </h2>
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

                    onAdd={() => setAdding(true)}
                    onDelete={onDelete}
                />

                {
                    adding &&
                    <AddEditComponent
                        title={"Allocate course"}
                        data={newStaffTask}
                        submit={add}
                        cancel={() => setAdding(false)}
                    />
                }
            </div>
        </div>
    );
}

export default DeanStaffViewPage;
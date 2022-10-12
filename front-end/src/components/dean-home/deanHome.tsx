import { useEffect, useState } from "react";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { ICourse, IGlobalContext, IResponse, IStaffCourse } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./deanHome.css"


interface IProps {
    context: IGlobalContext,
}

const DeanHome = (props: IProps) => {

    const [loading, setLoading] = useState(false);
    const [staffCourses, setStaffCourses] = useState<IStaffCourse[]>([]);

    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getUnapprovedAllocations();
    }, []);

    //----   GET STAFF COURSES   ----
    const getUnapprovedAllocations = async () => {
        setLoading(true);
        let result: IResponse = await Connection.getRequest(GET_ENDPOINT.GET_ALL_UNAPPROVED_ALLOCATIONS, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffCourses(result.data);
        console.log(result.data);
    }

    //----   ON ALLOCATION DELETE   ----
    const onAllocationDelete = async (data: IStaffCourse) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_STAFF_COURSE.toString();
        qry = qry.replace("{id}", data.StaffId.toString());
        qry = qry.replace("{courseId}", data.CourseId.toString());
        console.log(qry);
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedAllocations();
    }

    //----   ON ALLOCATION APPROVE   ----
    const onAllocationApprove = async (data: IStaffCourse) => {
        setLoading(true);
        let result: IResponse = await Connection.postRequest(POST_ENDPOINT.APPROVE_STAFF_COURSE, {
            courseId: data.CourseId,
            staffId: data.StaffId
        }, {});
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedAllocations();
    }

    return (
        <div className="dean-dashboard-container vert-flex full-size">
            <div className="dean-dashboard-card-small shadow">
                <TableComponent
                    title="Approve Course Allocations"
                    context={props.context}

                    ids={[...staffCourses]}
                    headerValues={["Staff", "Name"]}
                    data={
                        staffCourses.map((course, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.STRING, value: `${course.Staff.First_Name} ${course.Staff.Last_Name}` },
                                { type: TABLE_DATA_TYPE.STRING, value: course.Course.Name },
                            ];

                            return {
                                colValues: colVals
                            }
                        })
                    }

                    onReject={onAllocationDelete}
                    onApprove={onAllocationApprove}
                />

                {
                    loading &&
                    <Loading color="blue" />
                }
            </div>

        </div>
    );
}

export default DeanHome;
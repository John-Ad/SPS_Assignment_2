import { useEffect, useState } from "react";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { ICourse, IGlobalContext, IResponse, IStaffCourse } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./staffCourses.css"

interface INewInput {
    Course_Id: ISelect,
}

interface IProps {
    context: IGlobalContext,
    staffId: number
}

const StaffCourses = (props: IProps) => {

    const [loading, setLoading] = useState(false);
    const [staffCourses, setStaffCourses] = useState<IStaffCourse[]>([]);

    const [adding, setAdding] = useState(false);
    const [newCourseStaffInput, setNewCourseStaffInput] = useState<INewInput>({
        Course_Id: {
            ISelect: "ISelect",
            key: "Course_Id",
            values: [],
            value: 0
        }
    });
    const [courses, setCourses] = useState<ICourse[]>([]);

    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getStaffCourses();
        getAllCourses();
    }, []);

    // ON COURSES CHANGE
    useEffect(() => {
        mapCoursesForInput();
    }, [courses]);

    // MAP COURSES FOR INPUT
    const mapCoursesForInput = () => {
        let coursesShort = courses.map((c) => {
            return {
                value: c.Id,
                name: `${c.Name}`
            }
        });

        setNewCourseStaffInput({
            Course_Id: {
                ISelect: "ISelect",
                key: "Course_Id",
                values: coursesShort,
                value: (coursesShort.length > 0) ? coursesShort[0].value : 0
            }
        })
    }

    //----   GET STAFF COURSES   ----
    const getStaffCourses = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_STAFF_COURSES.toString();
        qry = qry.replace("{id}", props.staffId.toString());
        console.log(qry);
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffCourses(result.data);
        console.log(result.data);
    }

    //----   GET ALL COURSES   ----
    const getAllCourses = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_ALL_COURSES;
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setCourses(result.data);
    }


    //----   ADD STAFF COURSE   ----
    const addStaffCourse = async (data: INewInput): Promise<boolean> => {

        if (data.Course_Id.value === 0) {
            errorToast("Choose a course");
            return false;
        }

        let dataToSend = {
            staffId: props.staffId,
            courseId: data.Course_Id.value
        }

        const result: IResponse = await Connection.postRequest(POST_ENDPOINT.ADD_STAFF_COURSE, dataToSend, {});
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return false;
        }

        successToast("success", true);
        getStaffCourses();
        setAdding(false);
        return true;
    }


    //----   ON DELETE   ----
    const onDelete = async (data: IStaffCourse) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_STAFF_COURSE.toString();
        qry = qry.replace("{id}", props.staffId.toString());
        qry = qry.replace("{courseId}", data.CourseId.toString());
        console.log(qry);
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getStaffCourses();
    }

    return (
        <>
            <div className="full-size">
                <TableComponent
                    title="Courses"
                    context={props.context}

                    ids={[...staffCourses]}
                    headerValues={["Id", "Name"]}
                    data={
                        staffCourses.map((course, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.ID, value: course.Course.Id },
                                { type: TABLE_DATA_TYPE.STRING, value: course.Course.Name },
                            ];
                            if (course.IsApproved) {
                                colVals.push({ type: TABLE_DATA_TYPE.BADGE_SUCCESS, value: "approved" });
                            } else {
                                colVals.push({ type: TABLE_DATA_TYPE.BADGE_WARNING, value: "pending" });
                            }

                            return {
                                colValues: colVals
                            }
                        })
                    }

                    onAdd={() => setAdding(true)}
                    onDelete={onDelete}
                />

                {
                    loading &&
                    <Loading color="blue" />
                }

                {
                    adding &&
                    <AddEditComponent
                        title={"Allocate course"}
                        data={newCourseStaffInput}
                        submit={addStaffCourse}
                        cancel={() => setAdding(false)}
                    />
                }

            </div>


        </>
    );
}

export default StaffCourses;
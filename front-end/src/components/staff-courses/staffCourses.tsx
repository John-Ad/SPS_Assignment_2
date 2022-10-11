import { useEffect, useState } from "react";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { ICourse, IGlobalContext, IResponse, IStaffCourse } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./specialtiesPage.css"

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

    //----   GET ALL SPECIALTIES   ----
    const getStaffCourses = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_STAFF_COURSES;
        qry.replace("{id}", props.staffId.toString());
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffCourses(result.data);
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
    const addStaffCourse = async (data: number): Promise<boolean> => {

        if (data === 0) {
            errorToast("Choose a course");
            return false;
        }

        let dataToSend = {
            staffId: props.staffId,
            courseId: data
        }

        const result: IResponse = await Connection.postRequest(POST_ENDPOINT.ADD_STAFF_COURSE, dataToSend, {});
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return false;
        }

        successToast("success", true);
        getStaffCourses();
        return true;
    }


    //----   ON DELETE   ----
    const onDelete = async (data: IStaffCourse) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.ADD_STAFF_COURSE;
        qry.replace("{id}", props.staffId.toString());
        qry.replace("{courseId}", data.CourseId.toString());
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
                    title="Specialties"
                    context={props.context}

                    ids={[...staffCourses]}
                    headerValues={["Nr", "Name"]}
                    data={
                        staffCourses.map((course, index) => {
                            return {
                                colValues: [
                                    { type: TABLE_DATA_TYPE.ID, value: course.Course.Id },
                                    { type: TABLE_DATA_TYPE.STRING, value: course.Course.Name },
                                ]
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
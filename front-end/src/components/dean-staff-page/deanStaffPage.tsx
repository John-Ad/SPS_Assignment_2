import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { ICourse, IGlobalContext, IResponse, IStaffCourse, IUser } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./deanStaffPage.css"


interface IProps {
    context: IGlobalContext,
}

const DeanStaffPage = (props: IProps) => {

    const [loading, setLoading] = useState(false);
    const [staff, setStaff] = useState<IUser[]>([]);

    const navigate = useNavigate();

    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getStaff();
    }, []);


    //----   GET STAFF    ----
    const getStaff = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_ALL_STAFF.toString();
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaff(result.data);
    }

    //----   VIEW    ----
    const view = (user: IUser) => {
        navigate(`/dean/staff/${user.Id}`, { state: user });
    }

    return (
        <>
            <div className="full-size">
                <TableComponent
                    title="Staff"
                    context={props.context}

                    ids={[...staff]}
                    headerValues={["Id", "Name", "Email"]}
                    data={
                        staff.map((staff, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.ID, value: staff.Id.toString() },
                                { type: TABLE_DATA_TYPE.STRING, value: `${staff.First_Name} ${staff.Last_Name}` },
                                { type: TABLE_DATA_TYPE.STRING, value: `${staff.Email}` },
                            ];
                            return {
                                colValues: colVals
                            }
                        })
                    }
                    loading={loading}

                    onView={view}
                />
            </div>
        </>
    );
}

export default DeanStaffPage;
import { useEffect, useState } from "react";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { ICourse, IGlobalContext, IResponse, IStaffCourse, IStaffResearch } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import DownloadDocumentComponent from "../file-downloader-component/downloadDocComponent";
import Loading from "../loading-component/loading";
import StaffResearch from "../staff-research/staffResearch";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import "./deanHome.css"


interface IProps {
    context: IGlobalContext,
}

const DeanHome = (props: IProps) => {

    const [loading, setLoading] = useState(false);
    const [staffCourses, setStaffCourses] = useState<IStaffCourse[]>([]);
    const [staffResearch, setStaffResearch] = useState<IStaffResearch[]>([]);
    const [staffOutreach, setStaffOutreach] = useState<IStaffResearch[]>([]);
    const [staffWorkloads, setStaffWorkloads] = useState<IStaffResearch[]>([]);
    const [researchToDownload, setResearchToDownload] = useState<IStaffResearch>();

    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getUnapprovedAllocations();
        getUnapprovedResearch();
        getUnapprovedOutreach();
        getUnapprovedWorkload();
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

    //----   GET STAFF RESEARCH   ----
    const getUnapprovedResearch = async () => {
        setLoading(true);
        let result: IResponse = await Connection.getRequest(GET_ENDPOINT.GET_ALL_UNAPPROVED_RESEARCH, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffResearch(result.data);
        console.log(result.data);
    }

    //----   GET STAFF OUTREACH   ----
    const getUnapprovedOutreach = async () => {
        setLoading(true);
        let result: IResponse = await Connection.getRequest(GET_ENDPOINT.GET_ALL_UNAPPROVED_OUTREACH, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffOutreach(result.data);
        console.log(result.data);
    }

    //----   GET STAFF WORKLOADS   ----
    const getUnapprovedWorkload = async () => {
        setLoading(true);
        let result: IResponse = await Connection.getRequest(GET_ENDPOINT.GET_ALL_UNAPPROVED_WORKLOAD_SHEETS, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setStaffWorkloads(result.data);
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

    //----   ON RESEARCH DELETE   ----
    const onResearchDelete = async (data: IStaffResearch) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_RESEARCH.toString();
        qry = qry.replace("{researchId}", data.Id.toString());
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedResearch();
    }

    //----   ON OUTREACH DELETE   ----
    const onOutreachDelete = async (data: IStaffResearch) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_OUTREACH.toString();
        qry = qry.replace("{outreachId}", data.Id.toString());
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedOutreach();
    }

    //----   ON WORKLOAD DELETE   ----
    const onWorkloadDelete = async (data: IStaffResearch) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_WORKLOAD_SHEET.toString();
        qry = qry.replace("{sheetId}", data.Id.toString());
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedWorkload();
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

    //----   ON RESEARCH APPROVE   ----
    const onResearchApprove = async (data: IStaffResearch) => {
        setLoading(true);
        let qry = GET_ENDPOINT.APPROVE_RESEARCH.toString();
        qry = qry.replace("{researchId}", data.Id.toString());
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedResearch();
    }

    //----   ON OUTREACH APPROVE   ----
    const onOutreachApprove = async (data: IStaffResearch) => {
        setLoading(true);
        console.log(data);
        let qry = GET_ENDPOINT.APPROVE_OUTREACH.toString();
        qry = qry.replace("{outreachId}", data.Id.toString());
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedOutreach();
    }

    //----   ON WORKLOAD APPROVE   ----
    const onWorkloadApprove = async (data: IStaffResearch) => {
        setLoading(true);
        console.log(data);
        let qry = GET_ENDPOINT.APPROVE_WORKLOAD_SHEET.toString();
        qry = qry.replace("{sheetId}", data.Id.toString());
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getUnapprovedWorkload();
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
                    loading={loading}
                    onReject={onAllocationDelete}
                    onApprove={onAllocationApprove}
                />
            </div>
            <div className="dean-dashboard-card-small shadow">
                <TableComponent
                    title="Approve Research"
                    context={props.context}

                    ids={[...staffResearch]}
                    headerValues={["Staff", "Name"]}
                    data={
                        staffResearch.map((research, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.STRING, value: `${research.Staff.First_Name} ${research.Staff.Last_Name}` },
                                { type: TABLE_DATA_TYPE.STRING, value: research.Name },
                            ];

                            return {
                                colValues: colVals
                            }
                        })
                    }

                    loading={loading}
                    onReject={onResearchDelete}
                    onApprove={onResearchApprove}
                    onDownload={(file: IStaffResearch) => setResearchToDownload(file)}
                />
            </div>
            <div className="dean-dashboard-card-small shadow">
                <TableComponent
                    title="Approve Outreach"
                    context={props.context}

                    ids={[...staffOutreach]}
                    headerValues={["Staff", "Name"]}
                    data={
                        staffOutreach.map((outreach, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.STRING, value: `${outreach.Staff.First_Name} ${outreach.Staff.Last_Name}` },
                                { type: TABLE_DATA_TYPE.STRING, value: outreach.Name },
                            ];

                            return {
                                colValues: colVals
                            }
                        })
                    }

                    loading={loading}
                    onReject={onOutreachDelete}
                    onApprove={onOutreachApprove}
                    onDownload={(file: IStaffResearch) => setResearchToDownload(file)}
                />
            </div>
            <div className="dean-dashboard-card-small shadow">
                <TableComponent
                    title="Approve Workloads"
                    context={props.context}

                    ids={[...staffWorkloads]}
                    headerValues={["Staff", "Name"]}
                    data={
                        staffWorkloads.map((workload, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.STRING, value: `${workload.Staff.First_Name} ${workload.Staff.Last_Name}` },
                                { type: TABLE_DATA_TYPE.STRING, value: workload.Name },
                            ];

                            return {
                                colValues: colVals
                            }
                        })
                    }

                    loading={loading}
                    onReject={onWorkloadDelete}
                    onApprove={onWorkloadApprove}
                    onDownload={(file: IStaffResearch) => setResearchToDownload(file)}
                />
            </div>
            {
                researchToDownload &&
                <DownloadDocumentComponent context={props.context} fileName={researchToDownload.Name} filePath={researchToDownload.File_Path} hide={() => setResearchToDownload(undefined)} show={true} />
            }

        </div>
    );
}

export default DeanHome;

import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import { Connection, DELETE_ENDPOINT, GET_ENDPOINT, POST_ENDPOINT } from "../../connection";
import { IAddStaffResearch, ICourse, IGlobalContext, IResponse, IStaffCourse, IStaffResearch } from "../../interfaces/general_interfaces";
import AddEditComponent, { ISelect } from "../add-edit-component/AddEditComponent";
import { errorToast, successToast } from "../alert-components/toasts";
import Loading from "../loading-component/loading";
import TableComponent, { IColumnData, TABLE_DATA_TYPE } from "../table-component/tableComponent";
import DownloadDocumentComponent from "../file-downloader-component/downloadDocComponent";


interface IProps {
    context: IGlobalContext,
    staffId: number
}

const StaffOutreach = (props: IProps) => {

    const [loading, setLoading] = useState(false);
    const [outreach, setOutreach] = useState<IStaffResearch[]>([]);


    const [name, setName] = useState("");
    const [file, setFile] = useState<File>();

    const [uploadProgress, setUploadProgress] = useState(0);

    const [adding, setAdding] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [fileToDownload, setFileToDownload] = useState<IStaffResearch>();


    //----   COMPONENT DID MOUND   ----
    useEffect(() => {
        getStaffOutreach();
    }, []);


    //----   GET STAFF outreach   ----
    const getStaffOutreach = async () => {
        setLoading(true);
        let qry = GET_ENDPOINT.GET_STAFF_OUTREACH.toString();
        qry = qry.replace("{staffId}", props.staffId.toString());
        console.log(qry);
        let result: IResponse = await Connection.getRequest(qry, "");
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        setOutreach(result.data);
    }

    //----   ADD outreach   ----
    const add = async () => {

        if (!file) {
            errorToast("choose a file");
            return;
        }
        if (name === "") {
            errorToast("Enter a name");
            return;
        }

        setLoading(true);
        let data: FormData = new FormData();
        data.append("file", file);

        //## SETUP CONFIG TO MONITOR UPLOAD PROGRESS ##
        let config: AxiosRequestConfig = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let progress = Math.floor(loaded / total * 100);
                setUploadProgress(progress);
            }
        }

        let result: IResponse = await Connection.postRequest(POST_ENDPOINT.UPLOAD_FILE, data, config);
        setLoading(false);
        setUploadProgress(0);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }

        setLoading(true);
        let filePath = result.data.filePath;

        let dataToSend: IAddStaffResearch = {
            staffId: props.staffId,
            filePath: filePath,
            name: name
        }

        result = await Connection.postRequest(POST_ENDPOINT.ADD_STAFF_OUTREACH, dataToSend, {});
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return false;
        }

        successToast("success", true);
        getStaffOutreach();
        setAdding(false);
    }


    //----   ON DELETE   ----
    const onDelete = async (data: IStaffResearch) => {
        setLoading(true);
        let qry = DELETE_ENDPOINT.DELETE_OUTREACH.toString();
        qry = qry.replace("{outreachId}", data.Id.toString());
        let result: IResponse = await Connection.delRequest(qry);
        setLoading(false);
        if (result.errorMessage.length > 0) {
            errorToast(result.errorMessage, true);
            return;
        }
        getStaffOutreach();
    }

    return (
        <>
            <div className="full-size">
                <TableComponent
                    title="Outreach"
                    context={props.context}

                    ids={[...outreach]}
                    headerValues={["Id", "Name", "", ""]}
                    data={
                        outreach.map((r, index) => {
                            let colVals: IColumnData[] = [
                                { type: TABLE_DATA_TYPE.ID, value: r.Id },
                                { type: TABLE_DATA_TYPE.STRING, value: r.Name },
                            ];
                            if (r.IsApproved) {
                                colVals.push({ type: TABLE_DATA_TYPE.BADGE_SUCCESS, value: "approved" });
                            } else {
                                colVals.push({ type: TABLE_DATA_TYPE.BADGE_WARNING, value: "pending" });
                            }

                            return {
                                colValues: colVals
                            }
                        })
                    }
                    loading={loading}
                    onAdd={() => setAdding(true)}
                    onDelete={onDelete}
                    onDownload={(file: IStaffResearch) => setFileToDownload(file)}
                />

                {
                    adding &&
                    <Modal show={true} onHide={() => setAdding(false)} style={{ zIndex: 10000000 }}>
                        <Modal.Header closeButton>
                            Adding Outreach
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId={"asd"}>
                                    <Form.Label>Outreach Name:</Form.Label>
                                    <Form.Control onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder="" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose a file as evidence:</Form.Label>
                                    <Form.Control type="file" onChange={(e) => setFile((e as any).target.files[0])} />
                                </Form.Group>
                                {
                                    loading &&
                                    <div className="w-100 prg-bar">
                                        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                                    </div>
                                }
                                {
                                    loading &&
                                    <Loading color="blue" />
                                }
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setAdding(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => add()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
                {
                    fileToDownload &&
                    <DownloadDocumentComponent context={props.context} fileName={fileToDownload.Name} filePath={fileToDownload.File_Path} hide={() => setFileToDownload(undefined)} show={true} />
                }
            </div>


        </>
    );
}

export default StaffOutreach;

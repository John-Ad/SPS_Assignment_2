import { AxiosRequestConfig } from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { BaseUrl, Connection, GET_ENDPOINT, POST_ENDPOINT } from '../../connection';
import { IGlobalContext, IResponse } from '../../interfaces/general_interfaces';
import { errorToast } from '../alert-components/toasts';
import Loading from '../loading-component/loading';


interface IProps {
    context: IGlobalContext,
        filePath: string,
        fileName: string,
        show: boolean,
        hide(): void,

        extension?: string
}

const DownloadDocumentComponent = (props: IProps) => {

    const [loading, setLoading] = useState(false);
    const controller = new AbortController();
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<Blob>();

    // COMPONENT DID MOUNT
    useEffect(() => {
        downloadFile();
    }, []);

    // COMPONENT WILL UNMOUNT
    useLayoutEffect(() => {
    }, []);

    //----   DOWNLOAD FILE   ----
    const downloadFile = async () => {
        if (props.filePath === "" || !props.filePath) {
            errorToast("File does not exist");
            return;
        }

        setLoading(true);


        // create a node
        const link = document.createElement('a');
        link.href = BaseUrl+`/download/${props.filePath}`;
        link.setAttribute(
            'download',
            `${props.fileName}${props.extension ? `.${props.extension}` : ""}`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.remove();

        setLoading(false);
        props.hide();
    }



    return (
        <Modal show={props.show} onHide={() => props.hide()}>
            <Modal.Header closeButton>
                <Modal.Title>Downloading {props.fileName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading &&
                        <Loading />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => { controller.abort(); props.hide(); }}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DownloadDocumentComponent;

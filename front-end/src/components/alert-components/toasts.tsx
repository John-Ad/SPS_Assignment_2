import { ReactNode } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IGlobalContext } from "../../interfaces/general_interfaces";

const MySwal = withReactContent(Swal);

export const errorToast = async (title: string, showIcon?: boolean, timer?: number) => {
    await MySwal.fire({
        toast: true,
        position: "top-right",
        icon: showIcon ? "error" : undefined,
        title: title,
        timer: timer ? timer : 1000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}

export const successToast = async (title: string, showIcon?: boolean, timer?: number) => {
    await MySwal.fire({
        toast: true,
        position: "top-right",
        icon: showIcon ? "success" : undefined,
        title: title,
        timer: timer ? timer : 1000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}

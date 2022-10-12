import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { url } from "inspector";
import { USER_TYPE } from "./interfaces/general_enums";
import { IGlobalContext, IResponse } from "./interfaces/general_interfaces";

const BaseUrl = "http://localhost:8081";

export enum GET_ENDPOINT {
    GET_STAFF_COURSES = "/staff/{id}/courses",
    GET_ALL_COURSES = "/courses/",
    GET_ALL_UNAPPROVED_ALLOCATIONS = "/allocations/unapproved",
}
export enum POST_ENDPOINT {
    ADD_STAFF_COURSE = "/staff/{id}/courses",
    APPROVE_STAFF_COURSE = "/staff/{id}/courses/approve",
}
export enum DELETE_ENDPOINT {
    DELETE_STAFF_COURSE = "/staff/{id}/courses/{courseId}",
}

export enum ERROR_MESSAGES {
    NOT_INITIALIZED = "not_initialized",
    INVALID_REQUEST_TYPE = "invalid_request_type",
    SERVER_ERROR = "Server error occurred, try again later",
    NO_RESPONSE_ERROR = "No response received, try again later",
    REQUEST_SETUP_ERROR = "Error sending request, try again later"
}
enum REQUEST_TYPE {
    GET = 1,
    POST = 2,
    DEL = 3,
    PUT = 4
}
enum STORAGE_ITEM {
    TOKEN = "token",
    REFRESH_TOKEN = "refresh_token",
    USER_ID = "user_id",
    USER_TYPE = "user_type"
}


export class Connection {

    public static userId: string = "";
    public static userType: string = "";
    public static token: string = "";
    public static refreshToken: string = "";

    //----   SET CONNECTION DETAILS   ----
    public static setConnectionDetail(token: string, userId: number, userType: number) {
        this.token = token;
        this.userId = userId.toString();
        this.userType = userType.toString();

        this.setLocalStorage(token, userId.toString(), userType.toString());
    }

    //----   BUILD FROM LOCAL STORAGE   ----
    public static buildFromLocalStorage() {
        this.token = localStorage.getItem(STORAGE_ITEM.TOKEN) ?? "";
        this.refreshToken = localStorage.getItem(STORAGE_ITEM.REFRESH_TOKEN) ?? "";
        this.userId = localStorage.getItem(STORAGE_ITEM.USER_ID) ?? "";
        this.userType = localStorage.getItem(STORAGE_ITEM.USER_TYPE) ?? "";
    }

    //----   SET LOCAL STORAGE   ----
    private static setLocalStorage(token: string, userId: string, userType: string) {
        localStorage.setItem(STORAGE_ITEM.TOKEN, token);
        localStorage.setItem(STORAGE_ITEM.USER_ID, userId);
        localStorage.setItem(STORAGE_ITEM.USER_TYPE, userType);
    }

    //----   CLEAR LOCAL STORAGE   ----
    public static clearLocalStorage() {
        localStorage.clear();
    }

    //----   HANDLE HTTP REQUEST   ----
    private static handleRequest = async (reqType: string, data: any, config: AxiosRequestConfig, requestType: REQUEST_TYPE, retryCount = 1): Promise<IResponse> => {
        try {

            // set token
            config.headers = {
                "Authorization": `Bearer ${this.token}`
            }

            // only throw error if response >= 500
            config.validateStatus = (status) => {
                return status < 500;
            }

            let url = BaseUrl + reqType;
            let response: AxiosResponse<any, any>;
            switch (requestType) {
                case REQUEST_TYPE.GET:
                    response = await Axios.get(url, config);
                    break;
                case REQUEST_TYPE.POST:
                    response = await Axios.post(url, data, config);
                    break;
                case REQUEST_TYPE.DEL:
                    response = await Axios.delete(url, config);
                    break;
                default:
                    return { errorMessage: ERROR_MESSAGES.INVALID_REQUEST_TYPE, data: "" };
            }

            if (response.status === 401) {
                return { errorMessage: `Unauthorized: ${response.data.errorMessage}`, data: "" };
            }
            if (response.status === 403) {
                return { errorMessage: `forbidden: ${response.data.errorMessage}`, data: "" };
            }

            return response.data as IResponse;
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that is greater than or equal to 500
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return { errorMessage: ERROR_MESSAGES.SERVER_ERROR, data: "" };
            } else if (error.request) {
                // The request was made but no response was received
                return { errorMessage: ERROR_MESSAGES.NO_RESPONSE_ERROR, data: "" };
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                return { errorMessage: ERROR_MESSAGES.REQUEST_SETUP_ERROR, data: "" };
            }
        }
    }

    public static getRequest = async (reqType: string, data: any): Promise<IResponse> => {
        return await this.handleRequest(reqType, data, {}, REQUEST_TYPE.GET);
    }

    public static postRequest = async (reqType: string, data: any, config: AxiosRequestConfig): Promise<IResponse> => {
        return await this.handleRequest(reqType, data, config, REQUEST_TYPE.POST);
    }

    public static delRequest = async (reqType: string): Promise<IResponse> => {
        return await this.handleRequest(reqType, "", {}, REQUEST_TYPE.DEL);
    }
}




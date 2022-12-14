export interface IAddStaffCourse {
    staffId: number,
    courseId: number
}

export interface IAddStaffAdminTask {
    staffId: number,
    taskId: number
}

export interface IAddStaffResearch {
    staffId: number,
    name: string,
    filePath: string,
}

export interface IResponse {
    errorMessage: string,
    data: any
}
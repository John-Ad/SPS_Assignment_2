

//  1.  Global Context
export interface IGlobalContext {
    isMobile: boolean,

    userId: number,
    setUserId(newUserId: number): void,

    userType: UserType,
    setUserType(userType: UserType): void,

    token: string,
    setToken(newToken: string): void,

    logout(): void
}

//  2.  User type
export enum UserType {
    PUBLIC = 0,
    STAFF = 1,
    DEAN = 2,
}

//  3.  Request Response
export interface IResponse {
    errorMessage: string,
    data: any
}

//  4.  Login Response
export interface ILoginResponse {
    userId: number,
    roleId: number,
    token: string,
}

//  5.  User account
export interface IUser {
    Id: number,
    Email: string,
    First_Name: string,
    Last_Name: string,
}

export interface ICourse {
    Id: number,
    Name: string
}

export interface IStaffCourse {
    CourseId: number,
    StaffId: number,
    IsApproved: boolean,
    Course: ICourse
    Staff: IUser
}

export interface IAdminTask {
    Id: number,
    Name: string
}
export interface IStaffAdminTask {
    StaffId: number,
    AdminTaskId: number,
    AdminTask: IAdminTask
}
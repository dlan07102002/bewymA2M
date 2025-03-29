export interface IStudent {
    id?: number;
    fullName: string;
    dob: string;
    address: string;
    createDate?: string;
}

export interface IStudentResponse {
    success: boolean;
    data: IGetStudentListDataResponse | string;
}

export interface IGetStudentListDataResponse {
    count: number;
    lst: IStudent[];
}

export interface IModifiedStudentResponse {
    success: boolean;
    data: IStudent | {};
}

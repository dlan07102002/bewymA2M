export interface IStudent {
    id?: number;
    fullName: string;
    dob: string;
    address: string;
    createDate?: string;
}

export interface IGetStudentListResponse {
    data: IStudent[] | [];
    count: number;
}

export interface IModifiedStudentResponse {
    success: boolean;
    data: IStudent | {};
}

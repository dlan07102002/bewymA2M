import {
    IGetStudentListResponse,
    IStudent,
    IModifiedStudentResponse,
} from "../interface/Interface";

export async function getStudents(
    key: string = "", // Default to an empty string if no key is provided
    limit: number = 10,
    offset: number = 0
): Promise<IGetStudentListResponse> {
    try {
        const endpoint = `https://training.atwom.edu.vn/api/public/student/getLst?_keySearch=${encodeURIComponent(
            key
        )}&_limit=${limit}&_offset=${offset}`;

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch students: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        return { data: data?.data.lst || [], count: data?.data.count };
    } catch (error) {
        console.error("Error fetching students:", error);
        return { data: [], count: 0 };
    }
}

export async function addStudent(
    fullName: string,
    dob: string,
    address: string
): Promise<IModifiedStudentResponse> {
    const endpoint = `https://training.atwom.edu.vn/api/public/student/save`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                dob: dob,
                address: address,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: response.ok,
            data: data.data,
        };
    } catch (error: any) {
        console.error("Addition Failed", error);
        return { success: false, data: {} };
    }
}

export async function updateStudent(
    id: number,
    fullName: string,
    dob: string,
    address: string
): Promise<IModifiedStudentResponse> {
    const endpoint = `https://training.atwom.edu.vn/api/public/student/save`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                fullName: fullName,
                dob: dob,
                address: address,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: response.ok,
            data: data.data,
        };
    } catch (error: any) {
        console.error("Addition Failed", error);
        return { success: false, data: {} };
    }
}

export async function delStudent(id: number) {
    const endpoint = `https://training.atwom.edu.vn/api/public/student/${id}/del`;
    const response = await fetch(endpoint, {
        method: "DELETE",
    });

    if (!response.ok) {
        console.error("Failed to delete student:", response.statusText);
        return null;
    }

    return response.json();
}

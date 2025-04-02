import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    IGetStudentListDataResponse,
    IStudentDetailResponse,
} from "../interface/Interface";
import axios from "axios";

// Giá trị khởi tạo

const a2mUrl = process.env.REACT_APP_A2M_URL;
const localUrl = process.env.REACT_APP_LOCAL_URL;

interface StudentState {
    data: IGetStudentListDataResponse;
    success: boolean;
    loading: boolean; // Trạng thái đang tải
    error: string | null; // Lỗi (nếu có)
}

const initialState: StudentState = {
    data: { count: 0, lst: [] },
    success: false,
    loading: false,
    error: null,
};

export const getStudents = createAsyncThunk(
    "students/fetch",
    async ({
        key,
        limit,
        offset,
    }: {
        key: string;
        limit: number;
        offset: number;
    }) => {
        const response = await axios.get(
            `${a2mUrl}/api/public/student/getLst`,
            {
                params: {
                    _keySearch: key,
                    _limit: limit,
                    _offset: offset,
                },
            }
        );
        return response.data;
    }
);

export const addStudent = createAsyncThunk(
    "students/add",
    async (
        {
            fullName,
            dob,
            address,
        }: {
            fullName: string;
            dob: string;
            address: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `${a2mUrl}/api/public/student/save`,
                {
                    fullName: fullName,
                    dob: dob,
                    address: address,
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("Failed to add student:", error);
            return rejectWithValue(
                error.response?.data || "Failed to add student"
            );
        }
    }
);

export const updateStudent = createAsyncThunk(
    "students/update",
    async ({
        id,
        fullName,
        dob,
        address,
    }: {
        id: number;
        fullName: string;
        dob: string;
        address: string;
    }) => {
        try {
            console.log(id, fullName, dob, address);
            const response = await axios.post(
                `${a2mUrl}/api/public/student/save`,
                {
                    id: id,
                    fullName: fullName,
                    dob: dob,
                    address: address,
                }
            );

            console.log("Response: ", response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to update student:", error);
            return null;
        }
    }
);

export const delStudent = createAsyncThunk(
    "students/delete",
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${a2mUrl}/api/public/student/${id}/del`
            );

            if (!response.data.success) {
                throw new Error("Failed to delete student");
            }

            return { id };
        } catch (error: any) {
            console.error("Failed to delete student:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Students
        builder
            .addCase(getStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getStudents.fulfilled,
                (state, action: PayloadAction<StudentState>) => {
                    state.loading = false;
                    state.success = action.payload.success;
                    state.data.lst = action.payload.data.lst || [];
                    state.data.count = action.payload.data.count;
                }
            )
            .addCase(getStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add Student
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                addStudent.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    if (state.data.lst.length < 3)
                        state.data.lst.push(action.payload.data);
                    state.data.count = state.data.count + 1;
                }
            )
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Student
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateStudent.fulfilled,
                (state, action: PayloadAction<IStudentDetailResponse>) => {
                    state.loading = false;
                    state.data.lst = state.data.lst.map((student) => {
                        if (student.id == action.payload.data.id) {
                            student = action.payload.data;
                        }
                        return student;
                    });
                }
            )
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Student
            .addCase(delStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                delStudent.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    console.log(action.payload);
                    state.data.lst = state.data.lst.filter(
                        (student) => student.id !== action.payload.id
                    );
                }
            )
            .addCase(delStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Export action để sử dụng trong component
export const {} = studentSlice.actions;

// Export reducer để add vào store
export default studentSlice.reducer;

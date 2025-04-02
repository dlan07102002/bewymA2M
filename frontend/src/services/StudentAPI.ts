import axios from "axios";

const a2mUrl = process.env.REACT_APP_A2M_URL;
const localUrl = process.env.REACT_APP_LOCAL_URL;

export const fetchStudentDetail = async (id: number) => {
    const response = await axios.get(
        `${a2mUrl}/api/public/student/${id}/getDetail`
    );
    return response.data;
};

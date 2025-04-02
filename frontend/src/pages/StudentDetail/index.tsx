import { useEffect, useRef, useState } from "react";
import { IStudent, IStudentDetailResponse } from "../../interface/Interface";
import { fetchStudentDetail } from "../../services/StudentAPI";
import { useParams } from "react-router-dom";
import "./styles.css";
import ActionComp from "../../components/ActionComp/ActionComp";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

const StudentDetail = () => {
    const [student, setStudent] = useState<IStudent | null>(null);
    const params = useParams();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const id = params.id ? parseInt(params.id) : 0;
        const fetchApi = async () => {
            const response: IStudentDetailResponse = await fetchStudentDetail(
                id
            );
            if (response.success) {
                setStudent(response.data);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className="container">
            <div className="student-card">
                <h2 className="student-card-title">Student Profile</h2>
                {student && (
                    <>
                        <div className="student-card-content">
                            <p>
                                <strong>ID:</strong> {student.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {student.fullName}
                            </p>
                            <p>
                                <strong>Address:</strong> {student.address}
                            </p>
                            <p>
                                <strong>Date of Birth:</strong> {student.dob}
                            </p>
                        </div>
                        <ActionComp
                            element={student}
                            toast={toast}
                            setElement={setStudent}
                        />
                    </>
                )}
            </div>
            <ConfirmDialog />
            <Toast ref={toast} />
        </div>
    );
};

export default StudentDetail;

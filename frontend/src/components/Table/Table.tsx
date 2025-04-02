import { RefObject, memo } from "react";
import { IStudent } from "../../interface/Interface";
import ActionComp from "../ActionComp/ActionComp";
import { Toast } from "primereact/toast";

import "./styles.css";

import Spinner from "../common/Spinner/Spinner";
import formatDate from "../../utils/DateTimeFormat";
import { useAppSelector } from "../../store/hook";
import { useNavigate } from "react-router-dom";

interface ITableProps {
    spinner: boolean;
    toast: RefObject<Toast | null>;
}

const Table: React.FC<ITableProps> = (props) => {
    const { spinner, toast } = props;
    const navigate = useNavigate();

    const studentState = useAppSelector((state) => state.students);
    console.log(studentState);
    const renderTableBody = () => {
        if (spinner) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={6}>
                            <Spinner />
                        </td>
                    </tr>
                </tbody>
            );
        }

        // Kiểm tra state có tồn tại không
        if (!studentState || !studentState.data || !studentState.data.lst) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={6}>No data available</td>
                    </tr>
                </tbody>
            );
        }

        const handleShowStudent = (id: number) => {
            navigate(`/${id}`);
        };

        return (
            <tbody>
                {studentState.data.lst.map((student) => (
                    <tr key={student.id}>
                        <td onClick={() => handleShowStudent(student.id!)}>
                            {student.id}
                        </td>
                        <td onClick={() => handleShowStudent(student.id!)}>
                            {student.fullName}
                        </td>
                        <td onClick={() => handleShowStudent(student.id!)}>
                            {student.dob}
                        </td>
                        <td onClick={() => handleShowStudent(student.id!)}>
                            {student.address}
                        </td>
                        <td onClick={() => handleShowStudent(student.id!)}>
                            {formatDate(student.createDate)}
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <div className="table-container">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                {renderTableBody()}
            </table>
        </div>
    );
};

export default memo(Table);

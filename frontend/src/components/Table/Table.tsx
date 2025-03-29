import { RefObject, memo } from "react";
import { IStudent } from "../../interface/Interface";
import ActionComp from "../ActionComp/ActionComp";
import { Toast } from "primereact/toast";

import "./styles.css";

import Spinner from "../common/Spinner/Spinner";
import formatDate from "../../utils/DateTimeFormat";
import { useAppSelector } from "../../store/hook";

interface ITableProps {
    spinner: boolean;
    toast: RefObject<Toast | null>;
}

const Table: React.FC<ITableProps> = (props) => {
    const { spinner, toast } = props;

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

        return (
            <tbody>
                {studentState.data.lst.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.fullName}</td>
                        <td>{student.dob}</td>
                        <td>{student.address}</td>
                        <td>{formatDate(student.createDate)}</td>
                        <td>
                            <ActionComp element={student} toast={toast} />
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
                        <th>Actions</th>
                    </tr>
                </thead>
                {renderTableBody()}
            </table>
        </div>
    );
};

export default memo(Table);

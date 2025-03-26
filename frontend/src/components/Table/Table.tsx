import { RefObject, memo } from "react";
import { IStudent } from "../../interface/Interface";
import ActionComp from "../ActionComp/ActionComp";
import { Toast } from "primereact/toast";

import "./styles.css";

import Spinner from "../common/Spinner/Spinner";
import formatDate from "../../utils/DateTimeFormat";

interface ITableProps {
    spinner: boolean;
    toast: RefObject<Toast | null>;
    studentList: IStudent[] | [];
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
}

const Table: React.FC<ITableProps> = (props) => {
    const { spinner, toast, studentList, setStudentList } = props;
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
        return (
            <tbody>
                {studentList.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.fullName}</td>
                        <td>{student.dob}</td>
                        <td>{student.address}</td>
                        <td>{formatDate(student.createDate)}</td>
                        <td>
                            <ActionComp
                                element={student}
                                setStudentList={setStudentList}
                                toast={toast}
                            />
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

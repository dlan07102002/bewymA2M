import { useEffect, useRef, useState, useCallback } from "react";
import "./styles.css";
import { getStudents } from "../../services/StudentAPI";
import { IStudent } from "../../interface/Interface";
import ActionComp from "../ActionComp/ActionComp";
import StudentForm from "../StudentForm/StudentForm";
import { Toast } from "primereact/toast";
import Header from "../Header/Header";
import Pagination from "../common/Pagination/Pagination";
import { ConfirmDialog } from "primereact/confirmdialog";
import Spinner from "../common/Spinner/Spinner";
import formatDate from "../../utils/DateTimeFormat";

const PAGE_SIZE = 3;

const Table: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [spinner, setSpinner] = useState(false);
    const [studentList, setStudentList] = useState<IStudent[]>([]);
    const [searchKey, setSearchKey] = useState("");
    const [visible, setVisible] = useState(false);
    const toast = useRef<Toast>(null);

    // Fetch student list
    const getStudentList = useCallback(async () => {
        setSpinner(true);
        try {
            const response = await getStudents(
                searchKey,
                PAGE_SIZE,
                (currentPage - 1) * PAGE_SIZE
            );
            setStudentList(response.data);
            setTotalElements(response.count);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setTimeout(() => setSpinner(false), 1000);
        }
    }, [currentPage]);

    useEffect(() => {
        getStudentList();
    }, [getStudentList]);

    const handleAddClick = () => setVisible(true);

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
        <>
            <div className="main-container">
                <Header
                    setTotalElements={setTotalElements}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    handleAddClick={handleAddClick}
                    setStudentList={setStudentList}
                />
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

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalElements / PAGE_SIZE)}
                    onPageChange={setCurrentPage}
                />
            </div>

            <StudentForm
                updateStudent={null}
                setStudentList={setStudentList}
                visible={visible}
                setVisible={setVisible}
                toast={toast}
            />

            <ConfirmDialog />
            <Toast ref={toast} />
        </>
    );
};

export default Table;

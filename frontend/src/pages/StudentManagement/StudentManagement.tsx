import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import StudentForm from "../../components/StudentForm/StudentForm";
import Pagination from "../../components/common/Pagination/Pagination";
import Header from "../../components/Header/Header";
import { useState, useRef, useCallback, useEffect } from "react";
import { IStudent } from "../../interface/Interface";
import { getStudents } from "../../services/StudentAPI";
import Table from "../../components/Table/Table";

import "./styles.css";

const PAGE_SIZE = 3;

const StudentManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [spinner, setSpinner] = useState(false);
    const [visible, setVisible] = useState(false);
    const toast = useRef<Toast>(null);
    const [searchKey, _setSearchKey] = useState("");
    const [totalElements, _setTotalElements] = useState(0);
    const [studentList, _setStudentList] = useState<IStudent[]>([]);

    const setStudentList = useCallback(_setStudentList, []);
    const setSearchKey = useCallback(_setSearchKey, []);
    const setTotalElements = useCallback(_setTotalElements, []);
    const handleAddClick = useCallback(() => setVisible(true), []);

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
                <Table
                    studentList={studentList}
                    setStudentList={setStudentList}
                    spinner={spinner}
                    toast={toast}
                />

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

export default StudentManagement;

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import StudentForm from "../../components/StudentForm/StudentForm";
import Pagination from "../../components/common/Pagination/Pagination";
import Header from "../../components/Header/Header";
import { useState, useRef, useCallback, useEffect } from "react";
import { IStudent } from "../../interface/Interface";
import Table from "../../components/Table/Table";
import { getStudents } from "../../slices/studentSlice";

import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../store/hook";

const PAGE_SIZE = 3;

const StudentManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [spinner, setSpinner] = useState(false);
    const [visible, setVisible] = useState(false);
    const toast = useRef<Toast>(null);

    const handleAddClick = useCallback(() => setVisible(true), []);

    // Redux
    const dispatch = useAppDispatch();
    const studentState = useAppSelector((state) => state.students);
    const searchState = useAppSelector((state) => state.search);

    useEffect(() => {
        setSpinner(true);
        try {
            dispatch(
                getStudents({
                    key: searchState.searchKey,
                    limit: PAGE_SIZE,
                    offset: (currentPage - 1) * PAGE_SIZE,
                })
            );
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setTimeout(() => setSpinner(false), 1000);
        }
    }, [currentPage]);
    return (
        <>
            <div className="main-container">
                <Header handleAddClick={handleAddClick} />
                <Table spinner={spinner} toast={toast} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(studentState.data.count / PAGE_SIZE)}
                    onPageChange={setCurrentPage}
                />
            </div>
            <StudentForm
                targetStudent={null}
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

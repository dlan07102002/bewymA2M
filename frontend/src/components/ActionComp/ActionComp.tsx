import { Dialog } from "primereact/dialog";
import { useState, useRef, RefObject } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "./styles.css";
import { delStudent } from "../../services/StudentAPI";
import StuForm from "../StudentForm/StudentForm";
import { IStudent } from "../../interface/Interface";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method

interface ActionCompProps {
    element: IStudent;
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
    toast: RefObject<Toast | null>;
}
const ActionComp: React.FC<ActionCompProps> = ({
    element,
    setStudentList,
    toast,
}) => {
    const [visible, setVisible] = useState(false);
    const [stuFormVisible, setStuFormVisible] = useState(false);
    const [updateStudent, setUpdateStudent] = useState<IStudent | null>(null);

    // Delete
    const confirmDelete = () => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            defaultFocus: "accept",
            accept: acceptDelete,
            reject: rejectDelete,
        });
    };

    const handleDelete = async () => {
        if (element.id === undefined) {
            toast.current?.show({
                severity: "error",
                detail: "Invalid student ID",
            });
            return;
        }

        try {
            const response = await delStudent(element.id);
            if (response.success) {
                setStudentList((prevState) =>
                    prevState.filter(
                        (student: IStudent) => student.id !== element.id
                    )
                );
                toast.current?.show({
                    severity: "success",
                    detail: "Deleted successfully",
                });
            } else {
                throw new Error("Custom error message");
            }
        } catch (error) {
            toast.current?.show({
                severity: "error",
                detail: "Delete failed",
            });
        } finally {
            setVisible(false);
        }
    };

    const acceptDelete = async () => {
        toast.current?.show({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
        });
        handleDelete();
    };

    const rejectDelete = () => {
        toast.current?.show({
            severity: "warn",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
        });
    };

    // Update

    const handleUpdate = () => {
        setStuFormVisible(true);
        setUpdateStudent(element);
        setVisible(false);
    };

    return (
        <div>
            <div style={{ margin: "auto" }}>
                <div className="action-details">
                    <Button
                        label="Update"
                        onClick={handleUpdate}
                        severity="info"
                        size="small"
                    />
                    <Button
                        label="Delete"
                        onClick={confirmDelete}
                        severity="danger"
                        size="small"
                    />
                </div>
            </div>
            <StuForm
                updateStudent={updateStudent}
                setStudentList={setStudentList}
                visible={stuFormVisible}
                setVisible={setStuFormVisible}
                toast={toast}
            />
        </div>
    );
};

export default ActionComp;

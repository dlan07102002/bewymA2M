import { Dialog } from "primereact/dialog";
import { useState, useRef, RefObject } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "./styles.css";
import { delStudent } from "../../services/StudentAPI";
import StuForm from "../StuForm/StuForm";
import { IStudent } from "../../interface/Interface";

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
            console.log(response);
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

    const handleUpdate = () => {
        setStuFormVisible(true);
        setUpdateStudent(element);
        setVisible(false);
    };

    return (
        <>
            <div style={{ margin: "auto" }}>
                <Button
                    label="Action"
                    icon="pi pi-external-link"
                    onClick={() => setVisible(true)}
                />

                <Dialog
                    className="action"
                    header="Actions"
                    visible={visible}
                    style={{ textAlign: "center" }}
                    onHide={() => setVisible(false)}
                >
                    <div className="action-details">
                        <Button label="Delete" onClick={handleDelete} />
                        <Button label="Update" onClick={handleUpdate} />
                    </div>
                </Dialog>
            </div>
            <StuForm
                updateStudent={updateStudent}
                setStudentList={setStudentList}
                visible={stuFormVisible}
                setVisible={setStuFormVisible}
                toast={toast}
            />
        </>
    );
};

export default ActionComp;

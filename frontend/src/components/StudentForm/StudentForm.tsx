import "./styles.css";
import { useEffect, useState, useCallback, RefObject } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { addStudent, updateStudent as update } from "../../services/StudentAPI";
import { IStudent } from "../../interface/Interface";

interface IStuFormProps {
    updateStudent: IStudent | null;
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    toast: RefObject<Toast | null>;
}

const StudentForm: React.FC<IStuFormProps> = ({
    updateStudent,
    setStudentList,
    visible,
    setVisible,
    toast,
}) => {
    const [student, setStudent] = useState<IStudent>({
        id: 0,
        fullName: "",
        dob: "",
        address: "",
        createDate: "",
    });
    const [validationErrors, setValidationErrors] = useState({
        fullName: "",
        dob: "",
        address: "",
    });

    useEffect(() => {
        // console.log("update student", updateStudent);
        setStudent(
            updateStudent ?? {
                id: 0,
                fullName: "",
                dob: "",
                address: "",
                createDate: "",
            }
        );
        setValidationErrors({ fullName: "", dob: "", address: "" });
    }, [updateStudent]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setStudent((prev) => ({ ...prev, [id]: value }));
        setValidationErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const showToast = useCallback(
        (severity: "success" | "error", detail: string) => {
            toast.current?.show({ severity, detail });
        },
        [toast]
    );

    const validateForm = () => {
        const errors = {
            fullName: student.fullName.trim() ? "" : "Full Name is required",
            dob:
                !student.dob ||
                isNaN(Number(student.dob)) ||
                Number(student.dob) < 1900 ||
                Number(student.dob) > new Date().getFullYear()
                    ? "Enter a valid birth year (e.g., 2000)"
                    : "",
            address: student.address.trim() ? "" : "Address is required",
        };
        setValidationErrors(errors);
        return Object.values(errors).every((err) => !err);
    };

    const handleAdd = async () => {
        if (!validateForm()) return;
        try {
            const response = await addStudent(
                student.fullName,
                student.dob,
                student.address
            );
            if (response.success && response.data) {
                showToast("success", "Added successfully");
                setStudentList((prev) => [...prev, response.data as IStudent]);
                handleCloseForm();
            } else throw new Error("Adding student failed");
        } catch (error: any) {
            showToast("error", error.message || "Operation failed");
        }
    };

    const handleUpdate = async () => {
        if (!validateForm()) return;
        try {
            const response = await update(
                student.id!,
                student.fullName,
                student.dob,
                student.address
            );
            if (response.success && response.data) {
                showToast("success", "Updated successfully");
                setStudentList((prev) =>
                    prev.map((s) => (s.id === student.id ? { ...student } : s))
                );
                handleCloseForm();
            } else throw new Error("Updating student failed");
        } catch (error: any) {
            showToast("error", error.message || "Operation failed");
        }
    };

    const confirmUpdate = () => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: handleUpdate,
            reject: () => showToast("error", "You have rejected"),
        });
    };

    const handleSubmit = () => {
        student.id === 0 ? handleAdd() : confirmUpdate();
    };

    const handleCloseForm = () => {
        setValidationErrors({ fullName: "", dob: "", address: "" });
        setVisible(false);
    };

    return (
        <div className={`student-form-container ${visible ? "visible" : ""}`}>
            <span className="close-btn" onClick={handleCloseForm}>
                <i className="pi pi-times"></i>
            </span>
            <h3 className="form-title">Student Form</h3>
            {["fullName", "dob", "address"].map((field) => (
                <div key={field}>
                    <label htmlFor={field} className="p-hidden-accessible">
                        {field}
                    </label>
                    <InputText
                        id={field}
                        value={(student as any)[field]}
                        type={field === "dob" ? "number" : "text"}
                        onChange={handleInputChange}
                        placeholder={field}
                        className={`mr-2 ${
                            validationErrors[
                                field as keyof typeof validationErrors
                            ]
                                ? "p-invalid"
                                : ""
                        }`}
                    />
                    {validationErrors[
                        field as keyof typeof validationErrors
                    ] && (
                        <div className="p-error">
                            {
                                validationErrors[
                                    field as keyof typeof validationErrors
                                ]
                            }
                        </div>
                    )}
                </div>
            ))}
            <Button
                label="Submit"
                style={{ marginTop: "10px" }}
                onClick={handleSubmit}
            />
        </div>
    );
};

export default StudentForm;

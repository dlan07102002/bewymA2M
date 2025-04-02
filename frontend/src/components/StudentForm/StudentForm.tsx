import "./styles.css";
import { useEffect, useState, useCallback, RefObject } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { IStudent } from "../../interface/Interface";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addStudent, updateStudent } from "../../slices/studentSlice";

interface IStuFormProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    toast: RefObject<Toast | null>;
    element: IStudent | null;
    setElement?: React.Dispatch<React.SetStateAction<IStudent | null>>;
}

const StudentForm: React.FC<IStuFormProps> = ({
    setElement,
    element,
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

    const dispatch = useAppDispatch();
    const studentState = useAppSelector((state) => state.students);

    useEffect(() => {
        setStudent(
            element ?? {
                id: 0,
                fullName: "",
                dob: "",
                address: "",
                createDate: "",
            }
        );
        setValidationErrors({ fullName: "", dob: "", address: "" });
    }, [element]);

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
            dispatch(
                addStudent({
                    fullName: student.fullName,
                    dob: student.dob,
                    address: student.address,
                })
            );
            if (studentState.success && studentState.data) {
                showToast("success", "Added successfully");
                handleCloseForm();
            } else throw new Error("Adding student failed");
        } catch (error: any) {
            showToast("error", error.message || "Operation failed");
        }
    };

    const handleUpdate = async () => {
        if (!validateForm()) return;
        try {
            if (!student) {
                console.error("Student is null or undefined");
                return;
            }
            const result = await dispatch(
                updateStudent({
                    id: student.id!,
                    fullName: student.fullName,
                    dob: student.dob,
                    address: student.address,
                })
            );
            if (result.payload.success) {
                showToast("success", "Updated successfully");
                // For detail update
                setElement && setElement(result.payload.data);
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

        setStudent({
            id: 0,
            fullName: "",
            dob: "",
            address: "",
            createDate: "",
        });
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

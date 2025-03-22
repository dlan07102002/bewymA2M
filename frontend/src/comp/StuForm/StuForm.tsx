import "./styles.css";
import { InputText } from "primereact/inputtext";
import { RefObject, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { addStudent } from "../../services/StudentAPI";
import { Toast } from "primereact/toast";
import { IStudent } from "../../interface/Interface";

interface IStuFormProps {
    updateStudent: IStudent | null;
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    toast: RefObject<Toast | null>;
}

const StuForm: React.FC<IStuFormProps> = ({
    updateStudent,
    setStudentList,
    visible,
    setVisible,
    toast,
}) => {
    const [student, setStudent] = useState<IStudent>({
        id: 0, // Ensure ID exists if needed
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
        if (updateStudent) {
            setStudent(updateStudent);
            setValidationErrors({ fullName: "", dob: "", address: "" }); // Reset errors when updating
        } else {
            setStudent({
                id: 0,
                fullName: "",
                dob: "",
                address: "",
                createDate: "",
            });
        }
    }, [updateStudent]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setStudent((prev) => ({ ...prev, [id]: value }));

        setValidationErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const showToast = (severity: "success" | "error", detail: string) => {
        toast.current?.show({ severity, detail });
    };

    const validateForm = () => {
        let errors = { fullName: "", dob: "", address: "" };
        let isValid = true;

        if (!student.fullName.trim()) {
            errors.fullName = "Full Name is required";
            isValid = false;
        }

        if (!student.dob || isNaN(Number(student.dob))) {
            errors.dob = "Date of Birth must be a valid number";
            isValid = false;
        } else if (
            Number(student.dob) < 1900 ||
            Number(student.dob) > new Date().getFullYear()
        ) {
            errors.dob = "Enter a valid birth year (e.g., 2000)";
            isValid = false;
        }

        if (!student.address.trim()) {
            errors.address = "Address is required";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        try {
            const response = await addStudent(
                student.fullName,
                student.dob,
                student.address
            );

            if (response.success && response.data) {
                showToast("success", "Added successfully");
                setStudentList((prev) => [...prev, response.data as IStudent]);
                handleCloseForm(); // Reset form & close modal
            } else {
                throw new Error("Adding student failed");
            }
        } catch (error: any) {
            showToast("error", error.message || "Add failed");
        }
    };

    const handleCloseForm = () => {
        setStudent({
            id: 0,
            fullName: "",
            dob: "",
            address: "",
            createDate: "",
        });
        setValidationErrors({ fullName: "", dob: "", address: "" }); // Reset validation
        setVisible(false);
    };

    return (
        <div className={`student-form-container ${visible ? "visible" : ""}`}>
            <span className="close-btn" onClick={handleCloseForm}>
                X
            </span>
            <h3 className="form-title">Student Form</h3>

            <div>
                <label htmlFor="fullName" className="p-hidden-accessible">
                    Fullname
                </label>
                <InputText
                    id="fullName"
                    value={student.fullName}
                    onChange={handleInputChange}
                    placeholder="Fullname"
                    className={`mr-2 ${
                        validationErrors.fullName ? "p-invalid" : ""
                    }`}
                />
                {validationErrors.fullName && (
                    <div className="p-error">{validationErrors.fullName}</div>
                )}
            </div>

            <div className="flex flex-wrap align-items-center gap-2">
                <label htmlFor="dob" className="p-hidden-accessible">
                    Date Of Birth
                </label>
                <InputText
                    id="dob"
                    value={student.dob}
                    onChange={handleInputChange}
                    placeholder="Date Of Birth"
                    className={`mr-2 ${
                        validationErrors.dob ? "p-invalid" : ""
                    }`}
                />
                {validationErrors.dob && (
                    <div className="p-error">{validationErrors.dob}</div>
                )}
            </div>

            <div className="flex flex-wrap align-items-center gap-2">
                <label htmlFor="address" className="p-hidden-accessible">
                    Address
                </label>
                <InputText
                    id="address"
                    value={student.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className={`mr-2 ${
                        validationErrors.address ? "p-invalid" : ""
                    }`}
                />
                {validationErrors.address && (
                    <div className="p-error">{validationErrors.address}</div>
                )}
            </div>

            <Button
                label="Submit"
                style={{ marginTop: "10px" }}
                onClick={handleSubmit}
            />
        </div>
    );
};

export default StuForm;

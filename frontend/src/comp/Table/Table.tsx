import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { getStudents } from "../../services/StudentAPI";
import Search from "../Search/Search";
import { IStudent } from "../../interface/Interface";
import ActionComp from "../ActionComp/ActionComp";
import StuForm from "../StuForm/StuForm";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Header from "../Header/Header";

const Table: React.FC = () => {
    const [studentList, setStudentList] = useState<IStudent[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const getStudentList = async () => {
            const response = await getStudents();
            setStudentList(response);
        };
        getStudentList();
    }, []);

    const handleAddClick = () => {
        setVisible(true);
    };
    return (
        <>
            <div
                style={{ textAlign: "center", width: "70vw" }}
                className="main-container"
            >
                <Header
                    handleAddClick={handleAddClick}
                    setStudentList={setStudentList}
                />
                <table style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>fullname</th>
                            <th>dob</th>
                            <th>address</th>
                            <th>createdDate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((e: IStudent) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.fullName}</td>
                                <td>{e.dob}</td>
                                <td>{e.address}</td>
                                <td>{e.createDate + ""}</td>
                                <td>
                                    <ActionComp
                                        element={e}
                                        setStudentList={setStudentList}
                                        toast={toast}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <StuForm
                    updateStudent={null}
                    setStudentList={setStudentList}
                    visible={visible}
                    setVisible={setVisible}
                    toast={toast}
                />
            </div>
            <Toast ref={toast} />
        </>
    );
};

export default Table;

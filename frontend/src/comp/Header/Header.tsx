import { Button } from "primereact/button";
import Search from "../Search/Search";
import { IStudent } from "../../interface/Interface";
import { MouseEventHandler } from "react";
import "./styles.css";
interface IHeaderProp {
    handleAddClick: MouseEventHandler<HTMLButtonElement>;
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
}
const Header: React.FC<IHeaderProp> = ({ handleAddClick, setStudentList }) => {
    return (
        <>
            <h1>Student Management Form</h1>
            <div className="header-action-container">
                <Search setStudentList={setStudentList} />
                <Button label="Add student" onClick={handleAddClick} />
            </div>
        </>
    );
};

export default Header;

import { Button } from "primereact/button";
import Search from "../Search/Search";
import { IStudent } from "../../interface/Interface";
import { memo, MouseEventHandler } from "react";
import "./styles.css";
interface IHeaderProp {
    searchKey: string;
    setSearchKey: React.Dispatch<React.SetStateAction<string>>;
    handleAddClick: MouseEventHandler<HTMLButtonElement>;
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
    setTotalElements: React.Dispatch<React.SetStateAction<number>>;
}
const Header: React.FC<IHeaderProp> = ({
    searchKey,
    setSearchKey,
    handleAddClick,
    setStudentList,
    setTotalElements,
}) => {
    return (
        <>
            <h1>Student Management Form</h1>
            <div className="header-action-container">
                <Search
                    setStudentList={setStudentList}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setTotalElements={setTotalElements}
                />
                <Button label="Add student" onClick={handleAddClick} />
            </div>
        </>
    );
};

export default memo(Header);

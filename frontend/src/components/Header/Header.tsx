import { Button } from "primereact/button";
import Search from "../Search/Search";
import { IStudent } from "../../interface/Interface";
import { memo, MouseEventHandler } from "react";
import "./styles.css";
interface IHeaderProp {
    handleAddClick: MouseEventHandler<HTMLButtonElement>;
}
const Header: React.FC<IHeaderProp> = ({ handleAddClick }) => {
    return (
        <>
            <h1>Student Management Form</h1>
            <div className="header-action-container">
                <Search />
                <Button label="Add student" onClick={handleAddClick} />
            </div>
        </>
    );
};

export default memo(Header);

import { IStudent } from "../../interface/Interface";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./styles.css";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getStudents } from "../../slices/studentSlice";
import { setSearchKey } from "../../slices/searchSlice";
interface ISearch {}
const Search: React.FC<ISearch> = () => {
    const dispatch = useAppDispatch();
    const searchState = useAppSelector((state) => state.search);

    const handleClick = () => {
        dispatch(
            getStudents({
                key: searchState.searchKey,
                limit: 3,
                offset: 0,
            })
        );
    };

    const handleChangeKey = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchKey(e.target.value));
    };
    return (
        <div className="search-container">
            <InputText
                value={searchState.searchKey}
                onChange={handleChangeKey}
                id="search"
                placeholder="Search"
                style={{ marginRight: "10px" }}
            />

            <Button
                icon="pi pi-search"
                severity="secondary"
                onClick={handleClick}
            />
        </div>
    );
};

export default Search;

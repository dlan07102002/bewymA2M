import { useState } from "react";
import { IStudent } from "../../interface/Interface";
import { getStudents } from "../../services/StudentAPI";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./styles.css";
interface ISearch {
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
}
const Search: React.FC<ISearch> = ({ setStudentList }) => {
    const [searchKey, setSearchKey] = useState<string>("");
    const handleClick = () => {
        const getStudentList = async () => {
            const fetchApi = await getStudents(searchKey);
            console.log(fetchApi);
            setStudentList(fetchApi);
        };

        getStudentList();
    };
    return (
        <div className="search-container">
            <InputText
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                id="search"
                placeholder="Search"
                style={{ marginRight: "10px" }}
            />

            <Button label="Search" onClick={handleClick} />
        </div>
    );
};

export default Search;

import { IStudent } from "../../interface/Interface";
import { getStudents } from "../../services/StudentAPI";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./styles.css";
interface ISearch {
    setStudentList: React.Dispatch<React.SetStateAction<IStudent[]>>;
    searchKey: string;
    setSearchKey: React.Dispatch<React.SetStateAction<string>>;
    setTotalElements: React.Dispatch<React.SetStateAction<number>>;
}
const Search: React.FC<ISearch> = ({
    setStudentList,
    searchKey,
    setSearchKey,
    setTotalElements,
}) => {
    const handleClick = () => {
        const getStudentList = async () => {
            const response = await getStudents(searchKey, 3, 0);
            setStudentList(response.data);
            setTotalElements(response.count);
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

            <Button
                icon="pi pi-search"
                severity="secondary"
                onClick={handleClick}
            />
        </div>
    );
};

export default Search;

import React, {useState} from "react";
import PersonType from "../types/Person";
import PersonInfo from "./PersonInfo";
import SortType from "../types/SortType";

type Props = {
    persons: PersonType[];
    sort: SortType | null;
    setSort: (sort: SortType) => void;
};

const Table: React.FC<Props> = props => {
    const {persons, sort, setSort} = props;

    const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);

    const tablesFields: Array<keyof PersonType>= ["id", "firstName", "lastName", "email", "phone"];

    const handleTableHeadClick = (headName: keyof PersonType): void => {
        if (headName === sort?.field) {
            setSort({
                field: headName,
                direction: sort.direction === "asc" ? "desc" : "asc",
            });
        } else {
            setSort({
                field: headName,
                direction: "asc",
            });
        }
    };

    return (
        <>
            <table className="table table-hover persons-table">
                <thead>
                <tr>
                    {tablesFields.map(field => {
                        let sortIcon = "";
                        if (sort?.field === field) {
                            sortIcon = sort.direction === "asc" ? '🠗' : "🠕";
                        }
                        return (
                            <th onClick={() => handleTableHeadClick(field)}>{field} {sortIcon}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {persons.map(person => (
                    <tr key={person.id} className={selectedPerson?.id === person.id ? "selected" : ""}
                        onClick={() => setSelectedPerson(person)}>
                        <th>{person.id}</th>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.email}</td>
                        <td>{person.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedPerson !== null &&
            <PersonInfo person={selectedPerson} resetSelectedPerson={() => setSelectedPerson(null)}/>}
        </>
    );
};

export default Table;
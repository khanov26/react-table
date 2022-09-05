import React from "react";
import PersonType from "../../types/Person";
import PersonSort from "../../types/PersonSort";

type Props = {
    tableFields: Array<keyof PersonType>;
    persons: PersonType[];
    sort: PersonSort | null;
    onChangeSort: (sort: PersonSort) => void;
    selectedPerson: PersonType | null;
    onSelectPerson: (person: PersonType) => void;
};

const Table: React.FC<Props> = ({ tableFields, persons, sort, onChangeSort, selectedPerson, onSelectPerson }) => {
    const handleTableHeadClick = (headName: keyof PersonType) => () => {
        let sortDirection: PersonSort["direction"];
        if (headName === sort?.field) {
            sortDirection = sort.direction === "asc" ? "desc" : "asc";
        } else {
            sortDirection = "asc";
        }
        onChangeSort({
            field: headName,
            direction: sortDirection,
        });
    };

    const handlePersonClick = (person: PersonType) => () => {
        onSelectPerson(person);
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover persons-table">
                <thead>
                    <tr>
                        {tableFields.map(field => {
                            let sortIcon = "";
                            if (sort?.field === field) {
                                sortIcon = sort.direction === "asc" ? '🠗' : "🠕";
                            }
                            return (
                                <th
                                    key={field}
                                    onClick={handleTableHeadClick(field)}
                                >
                                    {field} {sortIcon}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {persons.map(person => (
                        <tr
                            key={person.id + person.firstName}
                            className={selectedPerson?.id === person.id ? "selected" : ""}
                            onClick={handlePersonClick(person)}>
                            <th>{person.id}</th>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.email}</td>
                            <td>{person.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
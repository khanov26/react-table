import React, {useState} from "react";
import PersonType from "../types/Person";
import PersonInfo from "./PersonInfo";

type Props = {
    persons: PersonType[];
};

const Table: React.FC<Props> = props => {
    const {persons} = props;

    const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);

    return (
        <>
            <table className="table table-hover persons-table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>phone</th>
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
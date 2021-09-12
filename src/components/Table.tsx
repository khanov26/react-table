import React from "react";
import PersonType from "../types/Person";

type Props = {
    persons: PersonType[];
};

const Table: React.FC<Props> = props => {
    const {persons} = props;

    return (
        <table className="table table-hover">
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
                <tr key={person.id} onClick={e => console.log(e)}>
                    <th>{person.id}</th>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
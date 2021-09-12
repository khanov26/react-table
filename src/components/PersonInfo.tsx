import React from "react";
import PersonType from "../types/Person";
import "./Table.css";

type Props = {
    person: PersonType;
    resetSelectedPerson: () => void;
};

const PersonInfo: React.FC<Props> = props => {
    const {person, resetSelectedPerson} = props;

    return (
        <div className="person-details alert alert-light alert-dismissible mt-3">
            <div>Выбран пользователь <b>{person.firstName} {person.lastName}</b></div>
            <div>
                <div>Описание:</div>
                <textarea readOnly value={person.description} className="w-100"/>
            </div>
            <div>Адрес проживания: <b>{person.address.streetAddress}</b></div>
            <div>Город: <b>{person.address.city}</b></div>
            <div>Провинция/штат: <b>{person.address.state}</b></div>
            <div>Индекс: <b>{person.address.zip}</b></div>

            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onClick={resetSelectedPerson}></button>
        </div>
    );
};

export default PersonInfo;
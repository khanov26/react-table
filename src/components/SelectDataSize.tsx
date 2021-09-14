import React from "react";
import useInput from "../hooks/inputHook";
import {useHistory} from "react-router-dom";

const SelectDataSize: React.FC = () => {
    const select = useInput("");

    const history = useHistory();

    const onSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        history.push(`/?data=${select.value}`);
    };

    return (
        <div className="row justify-content-center">
            <div className="col col-lg-auto">
                <form className="d-flex flex-column align-items-center" onSubmit={onSubmit}>
                    <h4 className="mb-3">Выберите размер данных</h4>

                    <select className="form-select form-select-lg" {...select.bind}>
                        <option value="" disabled>---</option>
                        <option value="small">маленький</option>
                        <option value="large">большой</option>
                    </select>

                    <button className="btn btn-lg btn-success mt-3" disabled={select.value === ""}>Скачать</button>
                </form>
            </div>
        </div>
    );
};

export default SelectDataSize;

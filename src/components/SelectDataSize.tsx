import React from "react";
import useInput from "../hooks/input";
import DataSize from "../types/DataSize";

type Props = {
    onSubmit: (dataSize: DataSize) => void;
};

const SelectDataSize: React.FC<Props> = ({onSubmit}) => {
    const select = useInput("");

    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        if (select.value === "small" || select.value === "large") {
            onSubmit(select.value);
        }
    };

    return (        
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <h4 className="mb-3">Выберите размер данных</h4>

            <select className="form-select form-select-lg" {...select.bind}>
                <option value="" disabled>---</option>
                <option value="small">маленький</option>
                <option value="large">большой</option>
            </select>

            <button className="btn btn-lg btn-success mt-3" disabled={select.value === ""}>Скачать</button>
        </form>
    );
};

export default SelectDataSize;

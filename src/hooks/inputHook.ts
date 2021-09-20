import React, {useState} from "react";

type ValueType = string;

const useInput = (initialValue: ValueType) => {
    const [value, setValue] = useState(initialValue);

    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = e => {
        setValue(e.target.value);
    };

    return {
        bind: {
            value,
            onChange,
        },
        value,
        setValue,
    }
};

export default useInput;
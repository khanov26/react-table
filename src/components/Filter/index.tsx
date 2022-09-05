import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import useInput from "../../hooks/input";
import "./styles.css";

type Props = {
    initialSearch: string;
    onChange: (search: string) => void;
};

const Filter: React.FC<Props> = ({initialSearch, onChange}) => {
    const search = useInput(initialSearch);

    const [formOpen, setFormOpen] = useState(false);

    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        if (search.value === "") {
            return;
        }
        onChange(search.value);
    };

    const resetFilterValue = () => {
        search.setValue("");
        onChange("");
    };

    return (
        <div className="row">
            <div className="col-12">
                <button 
                    className="btn btn-primary" 
                    onClick={() => setFormOpen(prevState => !prevState)}
                >
                    Фильтр
                </button>

                <CSSTransition 
                    in={formOpen} 
                    timeout={500} 
                    mountOnEnter 
                    unmountOnExit
                    classNames={{
                        enter: "filter-form--enter",
                        enterActive: "filter-form--entering",
                        exit: "filter-form--exit",
                        exitActive: "filter-form--exiting",
                    }}
                >
                    <form className="filter-form row mt-3" onSubmit={handleSubmit}>
                        <div className="filter-form__input-wrapper col-12 col-lg-8">
                            <input type="text" className="form-control" {...search.bind}/>
                            <span 
                                className="filter-form__reset" 
                                title="Очистить"
                                onClick={resetFilterValue}
                            >
                                &times;
                            </span>
                        </div>
                        <div className="col-12 mt-2 col-lg-4 mt-lg-0">
                            <button className="btn btn-success" disabled={search.value === ""}>Найти</button>
                        </div>
                    </form>
                </CSSTransition>
            </div>
        </div>
    );
};

export default memo(Filter);

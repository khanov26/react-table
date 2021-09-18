import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import useInput from "../hooks/inputHook";
import {useLocation, useHistory} from "react-router-dom";
import {QueryParams} from "../helpers";
import "./Filter.css";

const Filter: React.FC = () => {
    const input = useInput("");


    const [formOpened, setFormOpened] = useState(false);


    const history = useHistory();
    const {search: queryString} = useLocation();
    const queryParams = QueryParams.parse(queryString);


    const onSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        if (input.value === "") {
            return;
        }

        history.push("/?" + QueryParams.build({
            ...queryParams,
            "filter": String(input.value),
            "page": "1",
        }));
    };


    const resetFilterValue = () => {
        input.setValue("");
        history.push("/?" + QueryParams.build({
            ...queryParams,
            "filter": "",
            "page": "1",
        }));
    };

    return (
        <div className="row my-4">
            <div className="col col-lg-6">
                <button className="btn btn-primary" onClick={() => setFormOpened(prevState => !prevState)}>Фильтр
                </button>

                <CSSTransition in={formOpened} timeout={500} mountOnEnter unmountOnExit
                               classNames={{
                                   enter: "filter-form--enter",
                                   enterActive: "filter-form--entering",
                                   exit: "filter-form--exit",
                                   exitActive: "filter-form--exiting",
                               }}>
                    <form className="filter-form row mt-3" onSubmit={onSubmit}>
                        <div className="filter-form__input-wrapper col-12 col-lg-8">
                            <input type="text" className="form-control" {...input.bind}/>
                            <span className="filter-form__reset" title="Очистить"
                                  onClick={resetFilterValue}>&times;</span>
                        </div>
                        <div className="col-12 mt-2 col-lg-4 mt-lg-0">
                            <button className="btn btn-success" disabled={input.value === ""}>Найти</button>
                        </div>
                    </form>
                </CSSTransition>
            </div>
        </div>
    );
};

export default Filter;
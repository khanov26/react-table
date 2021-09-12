import React from "react";

type Props = {
    onSubmit: () => void;
};

const DataDownload: React.FC<Props> = (props) => {
    const onSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        props.onSubmit();
    };

    return (
        <div className="row justify-content-center">
            <div className="col col-lg-auto">
                <form className="d-flex flex-column align-items-center" onSubmit={onSubmit}>
                    <button className="btn btn-lg btn-success mt-3">Скачать</button>
                </form>
            </div>
        </div>
    );
};

export default DataDownload;

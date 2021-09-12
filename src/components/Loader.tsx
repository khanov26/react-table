import React from "react";

const Loader: React.FC = () => (
    <div className="d-flex justify-content-center py-3">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default Loader;
import React, {useEffect, useState} from "react";
import SelectDataSize from "./components/SelectDataSize";
import Table from "./components/Table";
import {useLocation} from "react-router-dom";
import DataSize from "./types/DataSize";

const App: React.FC = () => {
    const [dataSize, setDataSize] = useState<DataSize | null>(null);


    const {search} = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(search);

        const data = queryParams.get("data");
        switch (data) {
            case "small":
                setDataSize("small");
                break;
            case "large":
                setDataSize("large");
                break;
            default:
                setDataSize(null);
        }
    }, [search]);

    return (
        <div className="container py-3">
            {dataSize === null ?
                <SelectDataSize/> :
                <Table dataSize={dataSize}/>
            }
        </div>
    );
};

export default App;

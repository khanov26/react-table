import React, {useEffect, useState} from "react";
import SelectDataSize from "./components/SelectDataSize";
import Table from "./components/Table";
import {useLocation} from "react-router-dom";
import DataSize from "./types/DataSize";
import {QueryParams} from "./helpers";

const App: React.FC = () => {
    const [dataSize, setDataSize] = useState<DataSize | null>(null);


    const {search: queryString} = useLocation();
    const {data} = QueryParams.parse(queryString);
    useEffect(() => {
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
    }, [data]);


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

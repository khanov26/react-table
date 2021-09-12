import React, {useEffect, useState} from "react";
import DataDownload from "./components/DataDownload";
import Loader from "./components/Loader";
import PersonType from "./types/Person";
import Table from "./components/Table";

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
    };

    const [data, setData] = useState<PersonType[]>([]);

    useEffect(() => {
        if (loading) {
            fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
                .then(response => response.json())
                .then(response => {
                    setData(response);
                    setLoading(false);
                });
        }
    }, [loading]);

    return (
        <div className="container py-3">
            {loading && data.length === 0 && <Loader/>}
            {!loading && data.length === 0 && <DataDownload onSubmit={startLoading}/>}
            {!loading && data.length > 0 && <Table persons={data}/>}
        </div>
    );
};

export default App;

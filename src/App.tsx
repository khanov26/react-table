import React, {useEffect, useState} from "react";
import DataDownload from "./components/DataDownload";
import Loader from "./components/Loader";
import PersonType from "./types/Person";
import Table from "./components/Table";
import SortType from "./types/SortType";

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

    const [sort, setSort] = useState<SortType | null>(null);
    sortData(data, sort);

    function sortData(data: PersonType[], sort: SortType | null): void {
        if (sort === null) return;

        const compareFunction = (() => {
            if (sort.field === "id") {
                return sort.direction === "asc" ?
                    (a: PersonType, b: PersonType) => a.id - b.id :
                    (a: PersonType, b: PersonType) => b.id - a.id
            }

            return sort.direction === "asc" ?
                (a: PersonType, b: PersonType) => (a[sort.field] as string).localeCompare((b[sort.field] as string)) :
                (a: PersonType, b: PersonType) => (b[sort.field] as string).localeCompare((a[sort.field] as string))
        })();

        data.sort(compareFunction);
    }

    return (
        <div className="container py-3">
            {loading && data.length === 0 && <Loader/>}
            {!loading && data.length === 0 && <DataDownload onSubmit={startLoading}/>}
            {!loading && data.length > 0 && <Table persons={data} sort={sort} setSort={setSort}/>}
        </div>
    );
};

export default App;

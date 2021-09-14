import React, {useEffect, useMemo, useState} from "react";
import PersonType from "../types/Person";
import PersonInfo from "./PersonInfo";
import SortType from "../types/SortType";
import DataSize from "../types/DataSize";
import Loader from "./Loader";
import {useHistory, useLocation} from "react-router-dom";

type Props = {
    dataSize: DataSize;
};

const Table: React.FC<Props> = props => {
    const {dataSize} = props;

    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getDownloadingUrl = (dataSize: DataSize): string | undefined => {
        switch (dataSize) {
            case "small":
                return "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
            case "large":
                return "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
            default:
                history.push("/");
                return;
        }
    };
    const downloadingUrl = getDownloadingUrl(dataSize);

    const [persons, setPersons] = useState<PersonType[]>([]);
    useEffect(() => {
        if (loading) {
            fetch(downloadingUrl!)
                .then(response => response.json())
                .then(response => {
                    setPersons(response);
                    setLoading(false);
                });
        }
    }, [loading, downloadingUrl]);


    const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);

    const tablesFields: Array<keyof PersonType> =
        useMemo(() => ["id", "firstName", "lastName", "email", "phone"], []);

    const {search} = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    const handleTableHeadClick = (headName: keyof PersonType): void => {
        queryParams.set("orderBy", headName);
        if (headName === sort?.field) {
            queryParams.set("sort", sort.direction === "asc" ? "desc" : "asc");
        } else {
            queryParams.set("sort", "asc");
        }
        history.push("/?" + queryParams.toString());
    };

    useEffect(() => {
        const sortField = queryParams.get("orderBy");
        const sortDirection = queryParams.get("sort");
        if (sortField && tablesFields.includes(sortField as keyof PersonType) && (sortDirection === "asc" || sortDirection === "desc")) {
            setSort({
                field: sortField as keyof PersonType,
                direction: sortDirection,
            });
        }
    }, [queryParams, tablesFields]);

    const [sort, setSort] = useState<SortType | null>(null);
    sortData(persons, sort);

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
        <>
            {loading ?
                <Loader/> :
                <>
                    <table className="table table-hover persons-table">
                        <thead>
                        <tr>
                            {tablesFields.map(field => {
                                let sortIcon = "";
                                if (sort?.field === field) {
                                    sortIcon = sort.direction === "asc" ? '🠗' : "🠕";
                                }
                                return (
                                    <th onClick={() => handleTableHeadClick(field)}>{field} {sortIcon}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {persons.map(person => (
                            <tr key={person.id} className={selectedPerson?.id === person.id ? "selected" : ""}
                                onClick={() => setSelectedPerson(person)}>
                                <th>{person.id}</th>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.email}</td>
                                <td>{person.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {selectedPerson !== null &&
                    <PersonInfo person={selectedPerson} resetSelectedPerson={() => setSelectedPerson(null)}/>}
                </>
            }
        </>
    );
};

export default Table;
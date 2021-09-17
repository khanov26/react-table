import React, {useEffect, useMemo, useState} from "react";
import PersonType from "../types/Person";
import PersonInfo from "./PersonInfo";
import SortType from "../types/SortType";
import DataSize from "../types/DataSize";
import Loader from "./Loader";
import {useHistory, useLocation, Link} from "react-router-dom";
import Pagination from "./Pagination";
import {chunk, getSortedData, QueryParams} from "../helpers";

type Props = {
    dataSize: DataSize;
};

const Table: React.FC<Props> = props => {
    const {dataSize} = props;


    const history = useHistory();


    const [loading, setLoading] = useState(true);


    const [persons, setPersons] = useState<PersonType[]>([]);

    useEffect(() => {
        if (loading) {
            let url;
            switch (dataSize) {
                case "small":
                    url = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
                    break;
                case "large":
                    url = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
                    break;
            }

            fetch(url)
                .then(response => response.json())
                .then(response => {
                    setPersons(response);
                    setLoading(false);
                });
        }
    }, [loading, dataSize]);


    const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);


    const tablesFields: Array<keyof PersonType> = ["id", "firstName", "lastName", "email", "phone"];


    const {search: querySearch} = useLocation();
    const queryParams = QueryParams.parse(querySearch);


    const [sort, setSort] = useState<SortType | null>(null);


    const sortedPersons = useMemo(() => getSortedData(persons, sort), [persons, sort]);


    const handleTableHeadClick = (headName: keyof PersonType): void => {
        let sortDirection;
        if (headName === sort?.field) {
            sortDirection = sort.direction === "asc" ? "desc" : "asc";
        } else {
            sortDirection = "asc";
        }
        history.push("/?" + QueryParams.build({
            ...queryParams,
            "page": "1",
            "orderBy": headName,
            "sort": sortDirection,
        }));
    };

    useEffect(() => {
        const sortField = queryParams.orderBy;
        const sortDirection = queryParams.sort;
        if (sortField && tablesFields.includes(sortField as keyof PersonType) && (sortDirection === "asc" || sortDirection === "desc")) {
            setSort({
                field: sortField as keyof PersonType,
                direction: sortDirection,
            });
        }
    }, [queryParams.orderBy, queryParams.sort]);


    const elementPerPage = 50;
    const totalElementsNumber = persons.length;
    const totalPageNumber = Math.ceil(totalElementsNumber / elementPerPage);
    const currentPage =  queryParams.page ? Number(queryParams.page) : 1;

    const showingPersons: PersonType[] | undefined = chunk(sortedPersons, elementPerPage)[currentPage - 1];

    useEffect(() => {
        if (persons.length === 0) {
            return;
        }

        if (currentPage > totalPageNumber) {
            history.push("/?" + QueryParams.build({
                ...queryParams,
                "page": String(totalPageNumber),
            }));
        }
    }, [persons, queryParams, history, currentPage, totalPageNumber]);


    return (
        <>
            <Link to="/" className="btn btn-success mb-3">На главную</Link>
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
                                    <th key={field} onClick={() => handleTableHeadClick(field)}>{field} {sortIcon}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {showingPersons.map(person => (
                            <tr key={person.id + person.firstName} className={selectedPerson?.id === person.id ? "selected" : ""}
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

                    <Pagination elementPerPage={elementPerPage} totalElementsNumber={totalElementsNumber}
                                currentPage={currentPage}/>
                </>
            }
        </>
    );
};

export default Table;
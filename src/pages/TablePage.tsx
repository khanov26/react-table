import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AddPerson from '../components/AddPerson';
import Filter from '../components/Filter';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import PersonInfo from '../components/PersonInfo';
import Table from '../components/Table';
import { chunk, getSortedData, QueryParams } from '../helpers';
import DataSize from '../types/DataSize';
import PersonType from '../types/Person';
import PersonSort from '../types/PersonSort';

const tableFields: Array<keyof PersonType> = ["id", "firstName", "lastName", "email", "phone"];
const elementsPerPage = 50;

const TablePage: React.FC = () => {
    const history = useHistory();

    const { search: queryString } = useLocation();
    const searchParams = QueryParams.parse(queryString);

    const [loading, setLoading] = useState(true);
    const [persons, setPersons] = useState<PersonType[]>([]);
    const [error, setError] = useState("");

    const addNewPerson = useCallback((newPerson: PersonType) => {
        setPersons(prevState => [newPerson, ...prevState]);
    }, []);

    const [dataSize] = useState<DataSize | null>(() => {
        if (searchParams.data === "small" || searchParams.data === "large") {
            return searchParams.data;
        }
        return null;
    });

    useEffect(() => {
        let url;
        switch (dataSize) {
            case "small":
                url = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
                break;
            case "large":
                url = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
                break;
            default:
                setError("Неправильный размер данных");
                return;
        }

        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setPersons(response);
                setLoading(false);
            })
            .catch(error => {
                console.warn(error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dataSize]);

    const [sort, setSort] = useState<PersonSort | null>(() => {
        const sortField = searchParams.orderBy;
        const sortDirection = searchParams.sort;

        let sortObject: PersonSort;

        if (tableFields.includes(sortField as keyof PersonType)) {
            sortObject = {
                field: sortField as keyof PersonType,
                direction: "asc",
            };
        } else {
            return null;
        }

        if (sortDirection === "desc") {
            sortObject.direction = sortDirection;
        }

        return sortObject;
    });

    const [filter, setFilter] = useState(() => searchParams.filter || "");
    
    const handleFilterChange = useCallback((filter: string) => {
        setFilter(filter);
        setPage(1);
    }, []);

    const [page, setPage] = useState(() => Number(searchParams.page || "1"));

    useEffect(() => {
        const searchParams: Record<string, string> = {};
        if (dataSize) {
            searchParams.data = dataSize;
        }
        
        if (sort) {
            searchParams.orderBy = sort.field;
            searchParams.sort = sort.direction;
        }

        if (filter) {
            searchParams.filter = filter;
        }

        if (page > 1) {
            searchParams.page = String(page);
        }

        history.push({search: QueryParams.build(searchParams)});
    }, [dataSize, filter, history, page, sort]);

    const filteredPersons = useMemo(() => {
        const regex = new RegExp(filter, "i");

        return persons.filter(person => {
            for (let value of Object.values(person)) {
                if (regex.test(value.toString())) {
                    return true;
                }
            }

            return false;
        });
    }, [persons, filter]);

    const sortedPersons = useMemo(() => getSortedData(filteredPersons, sort), [filteredPersons, sort]);

    const showingPersons: PersonType[] = chunk(sortedPersons, elementsPerPage)[page - 1];

    const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);

    const resetSelectedPerson = useCallback(() => {
        setSelectedPerson(null);
    }, []);

    let content: React.ReactElement[] = [];
    if (error) {
        content.push(<div key="error" className="alert alert-danger" role="alert">{error}</div>);
    } else if (loading) {
        content.push(<Loader key="loader" />);
    } else {
        if (showingPersons && showingPersons.length > 0) {
            content.push(
                <Table
                    key="table"
                    tableFields={tableFields}
                    persons={showingPersons}
                    sort={sort}
                    onChangeSort={setSort}
                    selectedPerson={selectedPerson}
                    onSelectPerson={setSelectedPerson}
                />
            );
        } else {
            content.push(<div key="empty" className="alert alert-warning">Никто не найден</div>);
        }

        if (selectedPerson) {
            content.push(
                <PersonInfo
                    key="person-info"
                    person={selectedPerson}
                    resetSelectedPerson={resetSelectedPerson}
                />
            );
        }

        content.push(
            <Pagination
                key="pagination"
                elementPerPage={elementsPerPage}
                totalElementsNumber={filteredPersons.length}
                currentPage={page}
                onChange={setPage}
            />
        );
    }

    return (
        <>
            <Link to="/" className="btn btn-success mb-3">На главную</Link>

            <div className="row justify-content-between mb-3">
                <div className="col-12 col-md-6">
                    <Filter initialSearch={filter} onChange={handleFilterChange} />
                </div>
                <div className="col-auto">
                    <AddPerson addNewPerson={addNewPerson} />
                </div>
            </div>

            {content}
        </>
    )
}

export default TablePage;

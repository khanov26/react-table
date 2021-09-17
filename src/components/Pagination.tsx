import React from "react";
import {useLocation, Link} from "react-router-dom";
import {QueryParams} from "../helpers";

type Props = {
    elementPerPage: number;
    totalElementsNumber: number;
    currentPage: number;
};

const Pagination: React.FC<Props> = (props) => {
    const {elementPerPage, totalElementsNumber, currentPage} = props;


    const {search: querySearch} = useLocation();
    const queryParams = QueryParams.parse(querySearch);

    const totalPageNumber = Math.ceil(totalElementsNumber / elementPerPage);

    if (totalPageNumber === 1) {
        return null;
    }

    const showingPageNumber = Math.min(5, totalPageNumber);

    let startPage = currentPage - Math.floor((showingPageNumber - 1) / 2);
    let endPage = currentPage + Math.floor(showingPageNumber / 2);

    if (startPage < 1) {
        endPage += 1 - startPage;
        startPage = 1;
    }

    if (endPage > totalPageNumber) {
        startPage -= endPage - totalPageNumber;
        endPage = totalPageNumber;
    }

    const showPrevLink = currentPage > 1;
    const prevLink = "/?" + QueryParams.build({
        ...queryParams,
        "page": String(currentPage - 1),
    });

    const showNextLink = currentPage < totalPageNumber;
    const nextLink = "/?" + QueryParams.build({
        ...queryParams,
        "page": String(currentPage + 1),
    });

    const pages = new Array(endPage - startPage + 1)
        .fill(startPage)
        .map((value, index) => value + index);


    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {showPrevLink &&
                    <li key="prev" className="page-item">
                      <Link to={prevLink} className="page-link">
                        <span aria-hidden="true">&laquo;</span>
                      </Link>
                    </li>
                }

                {pages.map(page => {
                    const pageUrl = "/?" + QueryParams.build({...queryParams, page});
                    return page === currentPage ?
                        <li key={page} className="page-item active">
                            <a className="page-link">{page}</a>
                        </li> :
                        <li className="page-item">
                            <Link to={pageUrl} className="page-link">{page}</Link>
                        </li>
                })}


                {showNextLink &&
                    <li key="next" className="page-item">
                      <Link to={nextLink} className="page-link">
                        <span aria-hidden="true">&raquo;</span>
                      </Link>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Pagination;
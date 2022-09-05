import React, { memo } from "react";

type Props = {
    elementPerPage: number;
    totalElementsNumber: number;
    currentPage: number;
    onChange: (page: number) => void;
};

const Pagination: React.FC<Props> = (props) => {
    const {elementPerPage, totalElementsNumber, currentPage, onChange} = props;

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
    const showNextLink = currentPage < totalPageNumber;

    const pages = new Array(endPage - startPage + 1)
        .fill(startPage)
        .map((value, index) => value + index);

    const handleChangePage = (page: number) => () => {
        onChange(page);
    };


    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {showPrevLink &&
                    <li key="prev" className="page-item">
                      <button className="page-link" onClick={handleChangePage(currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                }

                {pages.map(page => {
                    return page === currentPage ?
                        <li key={page} className="page-item active">
                            <button className="page-link">{page}</button>
                        </li> :
                        <li key={page} className="page-item">
                            <button className="page-link" onClick={handleChangePage(page)}>{page}</button>
                        </li>
                })}


                {showNextLink &&
                    <li key="next" className="page-item">
                      <button className="page-link" onClick={handleChangePage(currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default memo(Pagination);

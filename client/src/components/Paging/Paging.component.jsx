import React from "react";

import { defaultProps, propTypes } from "./Paging.props";
import range from "utils/helpers/range";
import styles from "./Paging.module.scss";

Paging.propTypes = propTypes;
Paging.defaultProps = defaultProps;

function Paging ({
    count,
    currentPage,
    onChangePage,
    pageNeighbours,
    totalRecords
}) {
    const lastNumber = Math.ceil(totalRecords / count);
    const totalNumbers = (pageNeighbours * 2) + 1;

    const leftmostNumber = currentPage - pageNeighbours;
    const rightmostNumber = currentPage + pageNeighbours;

    const hasLeftSpill = leftmostNumber > 1;
    const hasRightSpill = rightmostNumber < lastNumber;

    const goToPage = (pageNumber) => {
        const page = Math.max(0, Math.min(pageNumber, lastNumber));
        onChangePage(page);
    };

    const getPagesRange = () => {
        const numbersBeforePivot = (hasLeftSpill) ? pageNeighbours : currentPage - 1;
        const numbersAfterPivot = totalNumbers - numbersBeforePivot - 1;

        const startNumber = Math.max(1, leftmostNumber);
        const endNumber = Math.min(lastNumber, currentPage + numbersAfterPivot);

        return range(startNumber, endNumber);
    };

    if (!totalRecords || lastNumber === 1) {
        return null;
    }

    const pagesRange = getPagesRange();

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === lastNumber;

    const moveLeft = () => goToPage(currentPage - 1);
    const moveRight = () => goToPage(currentPage + 1);

    const numberItems = pagesRange.map(page => (
        <li key={page}>
            <button
                className={page === currentPage ? styles.active : ""}
                onClick={() => goToPage(page)}
            >
                {page}
            </button>
        </li>
    ));

    return (
        <nav className={styles.container}>
            <ul className={styles.steps}>
                <li>
                    <button
                        disabled={isFirstPage}
                        onClick={moveLeft}
                    >
                        {"< Назад"}
                    </button>
                </li>

                <li>
                    <button
                        disabled={isLastPage}
                        onClick={moveRight}
                    >
                        {"Вперед >"}
                    </button>
                </li>
            </ul>

            <ul className={styles.paging}>
                {hasLeftSpill && (
                    <li>
                        <button onClick={() => goToPage(1)}>
                            {"<<"}
                        </button>
                    </li>
                )}

                {numberItems}

                {hasRightSpill && (
                    <li>
                        <button onClick={() => goToPage(lastNumber)}>
                            {">>"}
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Paging;

import React from "react";
import { withRouter } from "react-router";

import { defaultProps, propTypes } from "./Paging.props";
import range from "utils/helpers/range";
import styles from "./Paging.module.scss";

Paging.propTypes = propTypes;
Paging.defaultProps = defaultProps;

function Paging ({
    count,
    currentPage,
    history,
    pageNeighbours,
    pathPrefix,
    qs,
    setCurrentPage,
    totalRecords
}) {
    const lastNumber = Math.ceil(totalRecords / count);
    const totalNumbers = (pageNeighbours * 2) + 1;

    if (!totalRecords || lastNumber === 1) {
        return null;
    }

    const leftmostNumber = currentPage - pageNeighbours;
    const rightmostNumber = currentPage + pageNeighbours;

    const hasLeftSpill = leftmostNumber > 1;
    const hasRightSpill = rightmostNumber < lastNumber;

    const handlePageChange = (page) => {
        if (currentPage === page) {
            return;
        }

        const path = (!qs && page === 1)
            ? `${pathPrefix}/`
            : `${pathPrefix}/page${page}${qs}`;

        setCurrentPage(page);
        history.push(path);
    };

    const goToPage = (pageNumber) => {
        const page = Math.max(0, Math.min(pageNumber, lastNumber));
        handlePageChange(page);
    };

    const getPagesRange = () => {
        const numbersBeforePivot = (hasLeftSpill) ? pageNeighbours : currentPage - 1;
        const numbersAfterPivot = totalNumbers - numbersBeforePivot - 1;

        const startNumber = Math.max(1, leftmostNumber);
        const endNumber = Math.min(lastNumber, currentPage + numbersAfterPivot);

        return range(startNumber, endNumber);
    };

    const pagesRange = getPagesRange();

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === lastNumber;

    const moveLeft = () => goToPage(currentPage - 1);
    const moveRight = () => goToPage(currentPage + 1);

    const shouldShowSteps = lastNumber > 2;

    const numberItems = pagesRange.map(page => (
        <li className={styles.numberItem} key={page}>
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
            {shouldShowSteps && (
                <ul className={styles.steps}>
                    <li className={styles.step}>
                        <button
                            disabled={isFirstPage}
                            onClick={moveLeft}
                            title="На предыдущую страницу"
                        >
                            {" Назад"}
                        </button>
                    </li>

                    <li className={styles.step}>
                        <button
                            disabled={isLastPage}
                            onClick={moveRight}
                            title="На следующую страницу"
                        >
                            {"Вперед "}
                        </button>
                    </li>
                </ul>
            )}

            <section className={styles.paging}>
                <div
                    className={styles.spill}
                    title="На первую страницу"
                >
                    <button
                        disabled={!hasLeftSpill}
                        onClick={() => goToPage(1)}
                    >
                        <span>&laquo;</span>
                    </button>
                </div>

                <ul className={styles.list}>
                    {numberItems}
                </ul>

                <div
                    className={styles.spill}
                    title={`На последнюю страницу - ${lastNumber}`}
                >
                    <button
                        disabled={!hasRightSpill}
                        onClick={() => goToPage(lastNumber)}
                    >
                        <span>&raquo;</span>
                    </button>
                </div>
            </section>
        </nav>
    );
}

export default withRouter(Paging);

import { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";

import QSParser from "utils/parsers/QSParser";
import pubsub from "utils/pubsub";

function usePagination ({
    currentPage,
    fetchRecords,
    onSetCurrentPage,
    searchEventName,
    searchRecords
}) {
    const match = useRouteMatch();
    const location = useLocation();

    const { number } = match.params;
    const page = Number(number || currentPage);

    const qs = location.search;
    const qsParser = new QSParser(qs);
    const { st: stFromQuery } = qsParser.parse();

    const [stFromInput, setStFromInput] = useState("");
    const finalSt = stFromInput || stFromQuery;

    const resetSearch = () => {
        setStFromInput("");
        onSetCurrentPage(1);
    };

    useEffect(() => {
        if (number) {
            onSetCurrentPage(+number);
        }
    }, [number, onSetCurrentPage]);

    useEffect(() => {
        if (finalSt) {
            searchRecords({ page, searchTerm: finalSt });
        } else {
            fetchRecords({ page });
        }
    }, [fetchRecords, finalSt, page, searchRecords]);

    useEffect(() => {
        const setSt = (st) => setStFromInput(st);
        pubsub.subscribe(searchEventName, setSt);
        return () => pubsub.unsubscribe(searchEventName, setSt);
    }, [searchEventName]);

    return {
        qs: finalSt && `?st=${finalSt}`,
        resetSearch
    };
}

export default usePagination;

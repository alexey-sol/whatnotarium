import { useCallback, useEffect, useState } from "react";

import pubsub from "utils/pubsub";

function useSearch ({
    cbOnSubmit = null,
    onSetCurrentPage,
    redirectToSearchPage,
    searchEventName,
    searchRecords
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [prevSearchTerm, setPrevSearchTerm] = useState("");

    const resetSearch = useCallback(() => {
        if (searchTerm) {
            setSearchTerm("");
            setPrevSearchTerm("");
            pubsub.publish(searchEventName, "");
            onSetCurrentPage(1);
        }
    }, [onSetCurrentPage, searchEventName, searchTerm]);

    const onSearch = useCallback((cb) => {
        if (redirectToSearchPage) redirectToSearchPage();

        onSetCurrentPage(1);

        searchRecords({ searchTerm }, () => {
            pubsub.publish(searchEventName, searchTerm);
            setPrevSearchTerm(searchTerm);
            if (cb) cb();
        });
    }, [
        onSetCurrentPage, redirectToSearchPage, searchEventName, searchRecords,
        searchTerm
    ]);

    const isIdleSearch = !prevSearchTerm && !searchTerm;
    const isSameSearch = prevSearchTerm === searchTerm;
    const hasNewSearchTerm = !isIdleSearch && !isSameSearch;

    useEffect(() => {
        const handleKeydown = (event) => {
            const pressedSubmit = event.key === "Enter";
            const shouldSubmit = pressedSubmit && hasNewSearchTerm;

            if (shouldSubmit) {
                onSearch(cbOnSubmit);
            }
        };

        document.removeEventListener("keydown", handleKeydown);
        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    }, [cbOnSubmit, hasNewSearchTerm, onSearch]);

    return {
        hasNewSearchTerm,
        onSearch,
        prevSearchTerm,
        resetSearch,
        searchTerm,
        setSearchTerm
    };
}

export default useSearch;

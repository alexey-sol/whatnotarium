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

    useEffect(() => {
        const handleKeydown = (event) => {
            const pressedSubmit = event.key === "Enter";
            const isIdleSearch = !prevSearchTerm && !searchTerm;
            const isSameSearch = prevSearchTerm === searchTerm;
            const shouldSubmit = pressedSubmit && !isIdleSearch && !isSameSearch;

            if (shouldSubmit) {
                if (redirectToSearchPage) redirectToSearchPage();

                onSetCurrentPage(1);

                searchRecords({ searchTerm }, () => {
                    pubsub.publish(searchEventName, searchTerm);
                    setPrevSearchTerm(searchTerm);
                    if (cbOnSubmit) cbOnSubmit();
                });
            }
        };

        document.removeEventListener("keydown", handleKeydown);
        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    }, [
        cbOnSubmit, onSetCurrentPage, prevSearchTerm, redirectToSearchPage,
        searchEventName, searchRecords, searchTerm
    ]);

    return {
        prevSearchTerm,
        resetSearch,
        searchTerm,
        setSearchTerm
    };
}

export default useSearch;

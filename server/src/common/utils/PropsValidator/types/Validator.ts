import { ValidationResult } from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import PropName from "./PropName";

interface Validator {
    validateObject (
        objectToCheck: ObjectIndexer<any>,
        ...propNames: PropName[]
    ): ValidationResult;
}

export default Validator;

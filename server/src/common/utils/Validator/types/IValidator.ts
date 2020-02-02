import { ValidationResult } from "@hapi/joi";

import IIndexer from "types/IIndexer";
import IPropName from "./IPropName";

interface IValidator {
    validateObject (
        objectToCheck: IIndexer<any>,
        ...propNames: IPropName[]
    ): ValidationResult;
}

export default IValidator;

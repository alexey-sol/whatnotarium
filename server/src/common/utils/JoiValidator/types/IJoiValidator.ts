import { ObjectSchema, ValidationResult } from "@hapi/joi";

import IIndexer from "types/IIndexer";
import IPropName from "./IPropName";

interface IJoiValidator {
    validateObject (
        objectToCheck: IIndexer<any>,
        ...propNames: IPropName[]
    ): ValidationResult;
}

export default IJoiValidator;

import { ValidationResult } from "@hapi/joi";

import IObjectIndexer from "types/IObjectIndexer";
import IPropName from "./IPropName";

interface IValidator {
    validateObject (
        objectToCheck: IObjectIndexer<any>,
        ...propNames: IPropName[]
    ): ValidationResult;
}

export default IValidator;

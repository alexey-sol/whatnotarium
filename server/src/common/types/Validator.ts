import { ValidationResult } from "@hapi/joi";

export default interface Validator {
    validate (
        ...propNames: string[]
    ): ValidationResult;
}

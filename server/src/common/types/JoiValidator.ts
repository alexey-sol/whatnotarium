import { ValidationResult } from "@hapi/joi";

interface JoiValidator {
    validate (
        ...propNames: string[]
    ): ValidationResult;
}

export default JoiValidator;

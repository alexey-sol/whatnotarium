import { ObjectSchema, Reference, ValidationResult } from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import SchemaProvider from "./SchemaProvider";

type IsRequired = boolean;
type ObjectOptionKey = "max" | "min";
type ObjectOptionValue = number | Reference;
type ObjectOptions = {
    [Type in ObjectOptionKey]?: ObjectOptionValue;
};

class PropsValidator {
    constructor (
        private objectToCheck: ObjectIndexer<unknown>,
        private objectOptions?: ObjectOptions
    ) {
        this.objectToCheck = objectToCheck;
        this.objectOptions = objectOptions;
    }

    validate (
        ...propsToValidate: string[] | [string, IsRequired][]
    ): ValidationResult {
        const schema = this.createSchema(propsToValidate);

        const validationResult = schema.validate(
            this.objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }

    private createSchema (
        propsToValidate: string[] | [string, IsRequired][]
    ): ObjectSchema {
        const schemaProvider = new SchemaProvider(this.objectOptions);
        return schemaProvider.generate(propsToValidate);
    }
}

export default PropsValidator;

import Joi from "@hapi/joi";

import Indexer from "@common/types/Indexer";
import SchemaProvider from "./SchemaProvider";

type IsRequired = boolean;
type ObjectOptionKey = "max" | "min";
type ObjectOptionValue = number | Joi.Reference;
type ObjectOptions = {
    [Type in ObjectOptionKey]?: ObjectOptionValue;
};

class PropsValidator {
    constructor (
        private objectToCheck: Indexer<unknown>,
        private objectOptions?: ObjectOptions
    ) {
        this.objectToCheck = objectToCheck;
        this.objectOptions = objectOptions;
    }

    validate (
        ...propsToValidate: string[] | [string, IsRequired][]
    ): Joi.ValidationResult {
        const schema = this.createSchema(propsToValidate);

        const validationResult = schema.validate(
            this.objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }

    private createSchema (
        propsToValidate: string[] | [string, IsRequired][]
    ): Joi.ObjectSchema {
        const schemaProvider = new SchemaProvider(this.objectOptions);
        return schemaProvider.generate(propsToValidate);
    }
}

export default PropsValidator;

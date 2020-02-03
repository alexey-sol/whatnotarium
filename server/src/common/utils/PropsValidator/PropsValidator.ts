import Joi, {
    AnySchema,
    ObjectSchema,
    SchemaMap,
    ValidationResult
} from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import defaultPresets from "./defaultPresets";

interface Validator {
    validate (
        ...propNames: string[]
    ): ValidationResult;
}

class PropsValidator implements Validator {
    private objectToCheck: ObjectIndexer<any>;
    private presets: ObjectIndexer<AnySchema>;

    constructor (
        objectToCheck: ObjectIndexer<any>,
        customPresets?: ObjectIndexer<AnySchema>
    ) {
        this.objectToCheck = objectToCheck;
        this.presets = (customPresets)
            ? customPresets
            : defaultPresets;
    }

    private createSchema (
        propNames: string[]
    ): ObjectSchema {
        const schemaMap: SchemaMap = {};

        propNames.forEach(propName => {
            schemaMap[propName] = this.presets[propName];
        });

        return Joi.object(schemaMap);
    }

    validate (
        ...propNames: string[]
    ): ValidationResult {
        if (propNames.length === 0) {
            propNames = Object.keys(this.presets);
        }

        const schema: ObjectSchema = this.createSchema(propNames);
  
        const validationResult = schema.validate(
            this.objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }
}

export default PropsValidator;

import Joi, { ObjectSchema, SchemaMap, ValidationResult } from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import JoiPresets from "./types/JoiPresets";
import Validator from "./types/Validator";
import PropName from "./types/PropName";
import defaultPresets from "./defaultPresets";

class PropsValidator implements Validator {
    private presets: JoiPresets;

    constructor (
        customPresets: JoiPresets = {}
    ) {
        this.presets = {
            ...defaultPresets,
            ...customPresets
        };
    }

    private createSchema (
        propNames: PropName[]
    ): ObjectSchema {
        const schemaMap: SchemaMap = {};

        propNames.forEach(propName => {
            schemaMap[propName] = this.presets[propName];
        });

        return Joi.object(schemaMap);
    }

    validateObject (
        objectToCheck: ObjectIndexer<any>,
        ...propNames: PropName[]
    ): ValidationResult {
        const schema: ObjectSchema = this.createSchema(propNames);
  
        const validationResult = schema.validate(
            objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }
}

export default PropsValidator;

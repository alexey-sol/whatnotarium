import Joi, { ObjectSchema, SchemaMap, ValidationResult } from "@hapi/joi";

import IIndexer from "types/IIndexer";
import IJoiPresets from "./types/IJoiPresets";
import IJoiValidator from "./types/IJoiValidator";
import IPropName from "./types/IPropName";
import defaultPresets from "./defaultPresets";

class JoiValidator implements IJoiValidator {
    private presets: IJoiPresets;

    constructor (
        customPresets: IJoiPresets = {}
    ) {
        this.presets = {
            ...defaultPresets,
            ...customPresets
        };
    }

    private createSchemaMap (
        propNames: IPropName[]
    ): ObjectSchema {
        const schemaMap: SchemaMap = {};

        propNames.forEach(propName => {
            schemaMap[propName] = this.presets[propName];
        });

        return Joi.object(schemaMap);
    }

    validateObject (
        objectToCheck: IIndexer<any>,
        ...propNames: IPropName[]
    ): ValidationResult {
        const schema: ObjectSchema = this.createSchemaMap(propNames);
  
        const validationResult = schema.validate(
            objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }
}

export default JoiValidator;

import Joi, { ObjectSchema, SchemaMap, ValidationResult } from "@hapi/joi";

import IObjectIndexer from "types/IObjectIndexer";
import IJoiPresets from "./types/IJoiPresets";
import IValidator from "./types/IValidator";
import IPropName from "./types/IPropName";
import defaultPresets from "./defaultPresets";

class Validator implements IValidator {
    private presets: IJoiPresets;

    constructor (
        customPresets: IJoiPresets = {}
    ) {
        this.presets = {
            ...defaultPresets,
            ...customPresets
        };
    }

    private createSchema (
        propNames: IPropName[]
    ): ObjectSchema {
        const schemaMap: SchemaMap = {};

        propNames.forEach(propName => {
            schemaMap[propName] = this.presets[propName];
        });

        return Joi.object(schemaMap);
    }

    validateObject (
        objectToCheck: IObjectIndexer<any>,
        ...propNames: IPropName[]
    ): ValidationResult {
        const schema: ObjectSchema = this.createSchema(propNames);
  
        const validationResult = schema.validate(
            objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }
}

export default Validator;

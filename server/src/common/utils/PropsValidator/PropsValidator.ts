import Joi, {
    AnySchema,
    ObjectSchema,
    SchemaMap,
    ValidationResult
} from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import Validator from "types/Validator";
import defaultPresets from "./defaultPresets";

interface ObjectOptions {
    max?: number;
    min?: number;
}

class PropsValidator implements Validator {
    private presets: ObjectIndexer<AnySchema>;

    constructor (
        private objectToCheck: ObjectIndexer<any>,
        customPresets?: ObjectIndexer<AnySchema>,
        private objectOptions?: ObjectOptions
    ) {
        this.objectToCheck = objectToCheck;
        this.presets = (customPresets)
            ? customPresets
            : defaultPresets;
        this.objectOptions = objectOptions;
    }

    validate (
        ...propNames: string[]
    ): ValidationResult {
        if (propNames.length === 0) {
            propNames = Object.keys(this.presets);
        }

        const schema: ObjectSchema = this.generateSchema(propNames);
  
        const validationResult = schema.validate(
            this.objectToCheck,
            { stripUnknown: true }
        );

        return validationResult;
    }

    private generateSchema (
        propNames: string[]
    ): ObjectSchema {
        const schemaMap = this.createSchemaMap(propNames);

        return (this.objectOptions)
            ? this.createSchemaWithOptions(schemaMap, this.objectOptions)
            : this.createSchema(schemaMap);
    }

    private createSchemaMap (
        propNames: string[]
    ): SchemaMap {
        const schemaMap: SchemaMap = {};

        propNames.forEach(propName => {
            schemaMap[propName] = this.presets[propName];
        });

        return schemaMap;
    }

    private createSchema (
        schemaMap: SchemaMap
    ): ObjectSchema {
        return Joi.object(schemaMap);
    }

    private createSchemaWithOptions (
        schemaMap: SchemaMap,
        objectOptions: ObjectOptions
    ): ObjectSchema {
        let objectSchema = this.createSchema(schemaMap);

        for (const [key, value] of Object.entries(objectOptions)) {
            objectSchema = (objectSchema as any)[key](value);
        }

        return objectSchema;
    }
}

export default PropsValidator;

import Joi, {
    AnySchema,
    ObjectSchema,
    SchemaMap,
    ValidationResult
} from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import Validator from "types/JoiValidator";
import defaultPresets from "./defaultPresets";

type ObjectOptionKey = "max" | "min";

type ObjectOptions = {
    [Type in ObjectOptionKey]?: any;
};

class PropsValidator implements Validator {
    private presets: ObjectIndexer<AnySchema>;

    constructor (
        private objectToCheck: ObjectIndexer<any>,
        customPresets = defaultPresets,
        private objectOptions?: ObjectOptions
    ) {
        this.objectToCheck = objectToCheck;
        this.presets = customPresets;
        this.objectOptions = objectOptions;
    }

    validate (
        ...propNames: string[]
    ): ValidationResult {
        if (propNames.length === 0) {
            propNames = Object.keys(this.presets);
        }

        const schema = this.generateSchema(propNames);

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

    private createSchemaWithOptions (
        schemaMap: SchemaMap,
        objectOptions: ObjectOptions
    ): ObjectSchema {
        let objectSchema = this.createSchema(schemaMap);

        for (const [key, value] of Object.entries(objectOptions)) {
            objectSchema = this.updateSchemaByCallingOwnMethod(
                objectSchema,
                key as ObjectOptionKey,
                value
            );
        }

        return objectSchema;
    }

    private createSchema (
        schemaMap: SchemaMap
    ): ObjectSchema {
        return Joi.object(schemaMap);
    }

    private updateSchemaByCallingOwnMethod (
        objectSchema: ObjectSchema,
        methodName: ObjectOptionKey,
        methodArgument: any
    ): ObjectSchema {
        return objectSchema[methodName](methodArgument);
    }
}

export default PropsValidator;

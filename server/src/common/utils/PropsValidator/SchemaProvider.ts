import Joi from "@hapi/joi";

import SchemaMapProvider from "./SchemaMapProvider";

type IsRequired = boolean;
type ObjectOptionKey = "max" | "min";
type ObjectOptionValue = number | Joi.Reference;
type ObjectOptions = {
    [Type in ObjectOptionKey]?: ObjectOptionValue;
};

class SchemaProvider {
    constructor (private objectOptions?: ObjectOptions) {
        this.objectOptions = objectOptions;
    }

    generate (
        propsToValidate: string[] | [string, IsRequired][],
        objectOptions?: ObjectOptions
    ): Joi.ObjectSchema {
        const schemaMapProvider = new SchemaMapProvider();
        const schemaMap = schemaMapProvider.generate(propsToValidate);

        return (objectOptions)
            ? this.createSchemaWithOptions(schemaMap, objectOptions)
            : this.createSimpleSchema(schemaMap);
    }

    private createSchemaWithOptions (
        schemaMap: Joi.SchemaMap,
        objectOptions: ObjectOptions
    ): Joi.ObjectSchema {
        let objectSchema = this.createSimpleSchema(schemaMap);

        for (const [key, value] of Object.entries(objectOptions)) {
            objectSchema = this.updateSchemaByCallingItsMethod(
                objectSchema,
                key as ObjectOptionKey,
                value as ObjectOptionValue
                // We know that if there was no entry (and therefore no value),
                // this iteration wouldn't come.
            );
        }

        return objectSchema;
    }

    private createSimpleSchema (
        schemaMap: Joi.SchemaMap
    ): Joi.ObjectSchema {
        return Joi.object(schemaMap);
    }

    private updateSchemaByCallingItsMethod (
        objectSchema: Joi.ObjectSchema,
        methodName: ObjectOptionKey,
        methodArgument: ObjectOptionValue
    ): Joi.ObjectSchema {
        return objectSchema[methodName](methodArgument);
    }
}

export default SchemaProvider;

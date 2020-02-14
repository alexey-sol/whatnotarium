import Joi, {
    ObjectSchema,
    Reference,
    SchemaMap
} from "@hapi/joi";

import SchemaMapProvider from "./SchemaMapProvider";

type IsRequired = boolean;
type ObjectOptionKey = "max" | "min";
type ObjectOptionValue = number | Reference;
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
    ): ObjectSchema {
        const schemaMapProvider = new SchemaMapProvider();
        const schemaMap = schemaMapProvider.generate(propsToValidate);

        return (objectOptions)
            ? this.createSchemaWithOptions(schemaMap, objectOptions)
            : this.createSimpleSchema(schemaMap);
    }

    private createSchemaWithOptions (
        schemaMap: SchemaMap,
        objectOptions: ObjectOptions
    ): ObjectSchema {
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
        schemaMap: SchemaMap
    ): ObjectSchema {
        return Joi.object(schemaMap);
    }

    private updateSchemaByCallingItsMethod (
        objectSchema: ObjectSchema,
        methodName: ObjectOptionKey,
        methodArgument: ObjectOptionValue
    ): ObjectSchema {
        return objectSchema[methodName](methodArgument);
    }
}

export default SchemaProvider;

import { SchemaMap } from "@hapi/joi";

import ObjectIndexer from "types/ObjectIndexer";
import constraints from "./constraints";

type IsRequired = boolean;
type UnknownObject = ObjectIndexer<unknown>;

class SchemaMapProvider {
    private schemaMap: SchemaMap = {};

    generate (
        propsToValidate: string[] | [string, IsRequired][]
    ): SchemaMap {
        propsToValidate.forEach(this.assignConstraintToSchemaMap.bind(this));
        return this.schemaMap;
    }

    private assignConstraintToSchemaMap (prop: string): void;
    private assignConstraintToSchemaMap (prop: [string, IsRequired]): void;
    private assignConstraintToSchemaMap (prop: unknown): void {
        if (typeof prop === "string") {
            const newConstraint = this.updateAndGetConstraint(prop);

            if (newConstraint) {
                this.schemaMap[prop] = newConstraint;
            }
        } else if (Array.isArray(prop)) {
            const propName = prop[0];
            const isRequired = prop[1];

            const newConstraint = this.updateAndGetConstraint(
                propName,
                isRequired
            );

            if (newConstraint) {
                this.schemaMap[propName] = newConstraint;
            }
        }
    }

    private updateAndGetConstraint (
        propName: string,
        isRequired?: boolean
    ): UnknownObject | null {
        const constraint = this.findConstraint(propName);

        const isObject = constraint && typeof constraint === "object";

        return (isObject && isRequired)
            ? (constraint as any).required()
            : constraint;
    }

    private findConstraint (
        propName: string
    ): UnknownObject | null {
        const entries = Object.entries(constraints as UnknownObject);

        for (const [key, value] of entries) {
            if (key === propName) {
                return value as UnknownObject;
            }
        }

        return null;
    }
}

export default SchemaMapProvider;

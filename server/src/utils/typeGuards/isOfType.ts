function isOfType<Type> (
    objectToCheck: unknown,
    propertyToCheckFor: keyof Type
): objectToCheck is Type {
    return (objectToCheck as Type)[propertyToCheckFor] !== undefined;
}

export default isOfType;

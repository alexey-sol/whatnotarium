function isOfType<Type> (
    objectToCheck: unknown,
    propertyToCheckFor: keyof Type
): objectToCheck is Type {
    return propertyToCheckFor in (objectToCheck as Type);
}

export default isOfType;

function isOfType<Type> (
    objectToCheck: unknown,
    propertyToCheckFor: keyof Type
): objectToCheck is Type {
    return Boolean((objectToCheck as Type)[propertyToCheckFor]);
}

export default isOfType;

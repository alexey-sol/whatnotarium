const isOfType = function <Type> (
    objectToCheck: any,
    propertyToCheckFor: keyof Type
): objectToCheck is Type {
    return (objectToCheck as Type)[propertyToCheckFor] !== undefined;
};

export default isOfType;

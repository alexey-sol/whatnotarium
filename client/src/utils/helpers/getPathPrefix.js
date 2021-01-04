function getPathPrefix (pathname, endSegment = 2) {
    return pathname.split("/").splice(0, endSegment).join("/");
}

export default getPathPrefix;

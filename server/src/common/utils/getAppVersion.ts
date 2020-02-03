import packageJson from "root/package.json";

type IGetAppVersion = (
    getMajorVersion?: boolean
) => string | void;

const getAppVersion: IGetAppVersion = function (
    getMajorVersion?: boolean
): string | void {
    const fullVersion = packageJson.version;
    const majorVersion = fullVersion
        .split('.')
        .shift();

    return (getMajorVersion)
        ? majorVersion
        : fullVersion;
}

export default getAppVersion;

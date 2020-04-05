import packageJson from "#root/package.json";

class Version {
    static getMajorVersion (): string | void {
        const fullVersion = Version.getFullVersion();
        return fullVersion
            .split(".")
            .shift();
    }

    static getFullVersion (): string {
        return packageJson.version;
    }
}

export default Version;

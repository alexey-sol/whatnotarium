import HashPasswordOptions from "./HashPasswordOptions";

interface HashPasswordResult extends HashPasswordOptions {
    hash: Buffer;
}

export default HashPasswordResult;

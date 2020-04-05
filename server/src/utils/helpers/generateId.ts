import crypto from "crypto";

function generateId (): string {
    return crypto.randomBytes(20).toString("hex");
}

export default generateId;

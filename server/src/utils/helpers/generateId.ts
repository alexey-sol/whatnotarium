import crypto from "crypto";

function generateId (size = 20): string {
    return crypto.randomBytes(size).toString("hex");
}

export default generateId;

import crypto from "crypto";

type GenerateId = () => string;

const generateId: GenerateId = function () {
    return crypto.randomBytes(20).toString("hex");
};

export default generateId;

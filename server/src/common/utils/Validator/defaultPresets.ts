import Joi from "@hapi/joi";

import IJoiPresets from "./types/IJoiPresets";

const DEFAULT_PRESETS: IJoiPresets = {
    HOST: Joi.string().min(1).required().trim(),

    NODE_ENV: Joi.string().required().trim().valid(
        "development",
        "production",
        "test"
    ),

    PORT: Joi.number().required(),

    SESSION_SECRET: Joi.string().min(1).required().trim(),

    URL: Joi.string().min(8).required().trim()
};

export default DEFAULT_PRESETS;

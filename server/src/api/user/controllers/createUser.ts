import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import ApiController from "types/ApiController";
import CreateDbQuery from "types/CreateDbQuery";
import PropsValidator from "utils/PropsValidator";
import app from "app";
import hashPassword from "utils/hashPassword";

const validatorPresets = {
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6)
};

const createQuery: CreateDbQuery = function (values) {
    return {
        name: "create-user",
        text: `
            INSERT INTO
            users (
                email,
                password,
                name
            )
            VALUES (
                $1,
                $2,
                $3
            )
            RETURNING id;
        `,
        values
    };
};

const createUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const bodyValidator = new PropsValidator(
        request.body,
        validatorPresets
    );

    const { error, value } = bodyValidator.validate();
    
    if (error) {
        // return next(error);
    }

    const { email, name, password } = value;
    const hashPasswordResult = hashPassword(password);
    const { hash: hashedPassword } = hashPasswordResult;
    // hashing password: https://stackoverflow.com/a/17201493

    const pgPool = app.get("pgPool");

    try {
        const queryValues = [email, hashedPassword, name];
        const query = createQuery(queryValues);

        const result = await pgPool.query(query);
        const { id } = result.rows[0];

        response.status(201).send({ id });
    } catch (error) {
        // return next(error);
    }
};

export default createUser;

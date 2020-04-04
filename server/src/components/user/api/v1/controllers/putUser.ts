import { Response, RequestHandler } from "express";

import FormattedUserProps from "user/model/types/FormattedProps";
import HashOptions from "hashOptions/model";
import HashPasswordOptions from "types/HashPasswordOptions";
import PutUserRequestBody from "user/model/types/PutUserRequestBody";
import User from "user/model";
import hashPassword from "utils/helpers/hashPassword";
import sendResponse from "utils/http/sendResponse";

const putUser: RequestHandler = async function (
    { body, params },
    response,
    next
): Promise<void> {
    const { id } = params;
    const user = await User.findById(+id) as User;

    updateUserAndSendResponse(user, body, response)
        .catch(next);
};

export default putUser;

async function updateUserAndSendResponse (
    user: User,
    props: PutUserRequestBody,
    response: Response
): Promise<Response> {
    let updatedUser = null;

    const {
        email,
        name,
        newPassword
    } = props;

    const updatedProps: FormattedUserProps = {
        email,
        name,
        updatedAt: new Date()
    };

    if (newPassword) {
        const hashResult = await hashPassword(newPassword);
        const { hash } = hashResult;

        await updateHashOptions(user.id, hashResult);
        updatedProps.password = hash;
    }

    updatedUser = await user.updateAttributes(updatedProps);
    return sendResponse(response, updatedUser);
}

async function updateHashOptions (
    id: number,
    hashPasswordOptions: HashPasswordOptions
): Promise<void> {
    const hashOptions = await HashOptions.findOne({ userId: id });
    await hashOptions?.updateAttributes(hashPasswordOptions);
}

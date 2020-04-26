import faker from "faker";

import FormattedProps from "#types/user/FormattedProps";
import UserProps from "#types/user/UserProps";
import hashPassword from "#utils/helpers/hashPassword";

async function generateFakeUserProps (
    options: FormattedProps = {}
): Promise<UserProps> {
    const {
        createdAt,
        email,
        id,
        name,
        password,
        updatedAt
    } = options;

    const { hash } = await hashPassword(faker.internet.password());

    return {
        createdAt: createdAt || faker.date.past(),
        email: email || faker.internet.email(),
        id: id || faker.random.number({ min: 1 }),
        name: name || faker.name.findName(),
        password: password || hash,
        updatedAt: updatedAt || faker.date.past()
    };
}

export default generateFakeUserProps;

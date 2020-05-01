import faker from "faker";

import FormattedProps from "#types/user/FormattedProps";
import hashPassword from "#utils/helpers/hashPassword";

async function generateFakeUserProps (
    options: FormattedProps = {}
): Promise<FormattedProps> {
    const {
        email,
        id,
        name,
        password
    } = options;

    const { hash } = await hashPassword(faker.internet.password());

    return {
        email: email || faker.internet.email(),
        id: id || faker.random.number({ min: 1 }),
        name: name || faker.name.findName(),
        password: password || hash
    };
}

export default generateFakeUserProps;

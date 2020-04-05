import User from "#models/User";

export default async function (
    id: number
): Promise<boolean> {
    return User.destroyById(id);
}

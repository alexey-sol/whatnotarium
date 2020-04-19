import User from "#models/User";

export default async function (
    id: number
): Promise<number | null> {
    return User.destroyById(id);
}

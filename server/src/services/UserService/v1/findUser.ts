import User from "#models/User";

export default async function (
    id: number
): Promise<User | null> {
    return User.findById(id);
}

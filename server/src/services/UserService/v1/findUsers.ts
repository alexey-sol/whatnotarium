import User from "#models/User";

export default async function (): Promise<User[]> {
    return User.findAll();
}

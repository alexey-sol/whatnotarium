import UserItem from "#types/user/Item";

declare module "express-session" {
    interface Session {
        user?: UserItem;
    }
}

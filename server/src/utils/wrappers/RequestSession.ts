import { Request } from "express";
import { Session } from "express-session";

import UserItem from "#types/user/Item";
import sessionConfig from "#config/session";

interface SessionWithUser extends Session {
    user?: UserItem;
}

class RequestSession {
    private sessionName = sessionConfig.name;
    private session: SessionWithUser;

    constructor (private request: Request) {
        this.request = request;
        this.session = request.session as SessionWithUser;
    }

    attachUserToSession (user: UserItem): void {
        if (this.session) {
            this.session.user = user;
        }
    }

    isAdmin (): boolean {
        return Boolean(this.session?.user?.isAdmin);
    }

    isAuthed (): boolean {
        const { cookies } = this.request;
        return Boolean(this.session?.user && cookies?.[this.sessionName]);
    }

    isPermittedUser (userId: number): boolean {
        const sessionUser = this.getUserFromSession();
        return userId === sessionUser?.id;
    }

    cookieExistsButHasNoUser (): boolean {
        const { cookies } = this.request;

        return Boolean(
            !this.session?.user &&
            cookies?.[this.sessionName]
        );
    }

    getUserFromSession (): UserItem | undefined {
        return this.session?.user;
    }
}

export default RequestSession;

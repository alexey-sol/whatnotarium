import { Request } from "express";

import UserItem from "#types/user/Item";
import sessionConfig from "#config/session";

class RequestSession {
    private sessionName = sessionConfig.name;

    constructor (private request: Request) {
        this.request = request;
    }

    attachUserToSession (user: UserItem): void {
        const { session } = this.request;

        if (session) {
            session.user = user;
        }
    }

    isAdmin (): boolean {
        const { session } = this.request;
        return Boolean(session?.user?.isAdmin);
    }

    isAuthed (): boolean {
        const { session, cookies } = this.request;
        return Boolean(session?.user && cookies?.[this.sessionName]);
    }

    isPermittedUser (userId: number): boolean {
        const sessionUser = this.getUserFromSession();
        return userId === sessionUser?.id;
    }

    cookieExistsButHasNoUser (): boolean {
        const { cookies, session } = this.request;

        return Boolean(
            !session?.user &&
            cookies?.[this.sessionName]
        );
    }

    getUserFromSession (): UserItem | undefined {
        return this.request.session?.user;
    }
}

export default RequestSession;

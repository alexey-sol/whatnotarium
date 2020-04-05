import { Request } from "express";

import SessionUser from "#types/SessionUser";
import User from "#models/User";
import config from "#config";

class RequestSession {
    private sessionName = config.session.name;

    constructor (private request: Request) {
        this.request = request;
    }

    assignUserToSession (user: User): void {
        const { session } = this.request;

        if (session) {
            session.user = {};
            session.user.id = user.id;
        }
    }

    userIsSignedIn (): boolean {
        const { session, cookies } = this.request;

        return Boolean(
            session?.user &&
            cookies?.[this.sessionName]
        );
    }

    cookieExistsButHasNoUser (): boolean {
        const { cookies, session } = this.request;

        return Boolean(
            !session?.user &&
            cookies?.[this.sessionName]
        );
    }

    getUser (): SessionUser | undefined {
        return this.request.session?.user;
    }
}

export default RequestSession;

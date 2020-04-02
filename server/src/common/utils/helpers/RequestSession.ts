import { Request } from "express";

import SessionUser from "@common/types/SessionUser";
import User from "@user/model";
import sessionConfig from "@config/session";

class RequestSession {
    private sessionName = sessionConfig.name;

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

import status from "http-status";

import {
    GenericFailure,
    GenericProfile,
    GenericToken,
    ResponseWithMeta
} from "#types/externalApi/common/oauth/ResponseData";

import {
    Profile as GoogleProfile,
    Token as GoogleToken
} from "#types/externalApi/google/oauth/ResponseData";

import {
    Profile as YandexProfile,
    Token as YandexToken
} from "#types/externalApi/yandex/oauth/ResponseData";

import { IMAGE_EXT } from "#utils/const/defaultValues";
import { INVALID_REQUEST } from "#utils/const/oauthErrors";
import DataOnCreate from "#types/user/DataOnCreate";
import Download from "#utils/http/Download";
import OauthError from "#utils/errors/OauthError";
import OauthResponseFormatter from "#utils/formatters/OauthResponseFormatter";
import UserItem from "#types/user/Item";
import UserService from "#services/UserService/v1";
import isOfType from "#utils/typeGuards/isOfType";

type Token = GoogleToken | YandexToken;
type Profile = GoogleProfile | YandexProfile;

interface OauthApi {
    requestToken (code: string): Promise<ResponseWithMeta<Token>>;
    requestUserProfile (token: string): Promise<ResponseWithMeta<Profile | null>>;
}

class OauthProcessor {
    private token?: GenericToken;
    private profile?: GenericProfile;
    private userProps?: DataOnCreate;
    private result?: UserItem;

    constructor (
        private code: string,
        private api: OauthApi,
        private resFormatter = OauthResponseFormatter
    ) {
        this.code = code;
        this.api = api;
    }

    async setToken (): Promise<void> | never {
        const res = await this.api.requestToken(this.code);
        const formattedRes = this.resFormatter.formatToken(res);

        if (isOfType<GenericFailure>(formattedRes, "error")) {
            this.throw(formattedRes.error);
        } else {
            this.token = formattedRes;
        }
    }

    async setProfile (): Promise<void> | never {
        if (!this.token) return;

        const res = await this.api.requestUserProfile(this.token.accessToken);
        const formattedRes = this.resFormatter.formatProfile(res);

        if (formattedRes) {
            this.profile = formattedRes;
        } else {
            this.throw();
        }
    }

    async createOrUpdateUser (): Promise<void> | never {
        if (!this.profile || !this.userProps) return;

        const usersList = await UserService.findUsers({
            where: { email: this.profile.email }
        });

        let user = usersList.items[0];

        if (!user) {
            user = await UserService.createUser(this.userProps);
        } else if (user && !user.isConfirmed) {
            user = await UserService.updateUser(user.id, { isConfirmed: true });
        }

        this.result = user;
    }

    async setUserProps (): Promise<void> | never {
        if (!this.profile) return;
        let picture;

        const {
            birthdate,
            email,
            name,
            pictureUrl
        } = this.profile;

        if (pictureUrl) {
            picture = await new Download(pictureUrl, { fileExt: IMAGE_EXT }).getFile();
        }

        this.userProps = {
            birthdate,
            email,
            isConfirmed: true,
            name,
            picture
        };
    }

    async getResult (): Promise<UserItem> | never {
        await this.setToken();
        await this.setProfile();
        await this.setUserProps();
        await this.createOrUpdateUser();

        if (!this.result) {
            this.throw();
        }

        return this.result;
    }

    private throw (errorName = INVALID_REQUEST): never {
        throw new OauthError(errorName, status.BAD_REQUEST);
    }
}

export default OauthProcessor;

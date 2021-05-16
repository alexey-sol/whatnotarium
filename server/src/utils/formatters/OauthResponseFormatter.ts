import {
    GenericFailure,
    GenericProfile,
    GenericToken,
    ResponseWithMeta
} from "#types/externalApi/common/oauth/ResponseData";

import {
    Profile as GoogleProfile,
    Token as GoogleToken,
    TokenFailure as GoogleTokenFailure,
    TokenSuccess as GoogleTokenSuccess
} from "#types/externalApi/google/oauth/ResponseData";

import {
    Profile as YandexProfile,
    Token as YandexToken,
    TokenFailure as YandexTokenFailure,
    TokenSuccess as YandexTokenSuccess
} from "#types/externalApi/yandex/oauth/ResponseData";

import { Providers, Types } from "#types/externalApi/common/oauth/meta";
import { USER_PIC_SIZE } from "#utils/const/defaultValues";

type TokenSuccess = GoogleTokenSuccess | YandexTokenSuccess;
type TokenFailure = GoogleTokenFailure | YandexTokenFailure;

type Token = GoogleToken | YandexToken;
type Profile = GoogleProfile | YandexProfile;

const OauthResponseFormatter = {
    formatToken (res: ResponseWithMeta<Token>): GenericToken | GenericFailure {
        return (res.type === Types.success)
            ? this._utils.getTokenSuccess(res.value as TokenSuccess)
            : this._utils.getTokenFailure(res.value as TokenFailure);
    },

    formatProfile (res: ResponseWithMeta<Profile | null>): GenericProfile | null {
        let result = null;

        if (!res.value) {
            return result;
        }

        if (res.provider === Providers.google) {
            result = this._utils.getGoogleProfile(res.value as GoogleProfile);
        } else if (res.provider === Providers.yandex) {
            result = this._utils.getYandexProfile(res.value as YandexProfile);
        }

        return result;
    },

    _utils: {
        getTokenSuccess (value: TokenSuccess): GenericToken {
            return {
                accessToken: value.access_token,
                expiresIn: value.expires_in,
                refreshToken: value.refresh_token,
                tokenType: value.token_type
            };
        },

        getTokenFailure ({ error, error_description }: TokenFailure): GenericFailure {
            return {
                error,
                errorDescription: error_description
            };
        },

        getGoogleProfile ({ email, name, picture }: GoogleProfile): GenericProfile {
            return {
                email,
                name,
                pictureUrl: picture?.replace(/=s\d+/g, `=s${USER_PIC_SIZE}`)
            };
        },

        getYandexProfile ({
            birthday,
            default_avatar_id: avatarId,
            default_email: email,
            is_avatar_empty: noPicture,
            login: name
        }: YandexProfile): GenericProfile {
            return {
                birthdate: (birthday)
                    ? new Date(birthday)
                    : undefined,
                email,
                name,
                pictureUrl: (noPicture)
                    ? undefined
                    : `https://avatars.yandex.net/get-yapic/${avatarId}/${USER_PIC_SIZE}`
            };
        }
    }
};

export default OauthResponseFormatter;

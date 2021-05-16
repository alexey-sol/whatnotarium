import { Providers, Types } from "#types/externalApi/common/oauth/meta";

export interface GenericProfile {
    birthdate?: Date;
    email: string;
    name: string;
    pictureUrl?: string;
}

export interface GenericToken {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
}

export interface GenericFailure {
    error: string;
    errorDescription: string;
}

export interface ResponseWithMeta<Data> {
    value: Data;
    provider: Providers;
    type: Types;
}

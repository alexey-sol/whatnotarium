export interface ProfileSuccess {
    sub: string;
    name: string;
    picture?: string;
    email: string;
    email_verified: string;
}

export interface TokenSuccess {
    token_type: string;
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
}

export interface TokenFailure {
    error: string;
    error_description: string;
}

export type Profile = ProfileSuccess;
export type Token = TokenSuccess | TokenFailure;

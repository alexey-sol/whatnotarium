export interface ProfileSuccess {
    birthday?: string;
    default_avatar_id: string;
    default_email: string;
    id: string;
    is_avatar_empty: boolean;
    login: string;
}

export interface TokenSuccess {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

export interface TokenFailure {
    error: string;
    error_description: string;
}

export type Profile = ProfileSuccess;
export type Token = TokenSuccess | TokenFailure;

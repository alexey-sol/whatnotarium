export interface RequestProfileSuccess {
    sub: string;
    name: string;
    picture?: string;
    email: string;
    email_verified: string;
}

export interface RequestTokenSuccess {
    token_type: string;
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
}

export interface CommonFailure {
    error: string;
    error_description: string;
}

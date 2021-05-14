export interface RequestProfileSuccess {
    birthday?: string;
    default_avatar_id?: string;
    default_email: string;
    id: string;
    is_avatar_empty: boolean;
    login: string;
}

export interface RequestTokenSuccess {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

export interface CommonFailure {
    error: string;
    error_description: string;
}

export interface Success {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

export interface Failure {
    error: string;
    error_description: string;
}

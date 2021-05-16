class OauthConsentScreen {
    constructor (providerName, url = null) {
        this._providerName = providerName;
        this._url = url;
    }

    set url (newUrl) {
        this._url = newUrl;
    }

    openWindow () {
        window.open(this._url, `Авторизация через ${this._providerName}`);
    }
}

export class YandexConsentScreen extends OauthConsentScreen {
    constructor (url = null) {
        super("Яндекс", url);

        if (!url) {
            const clientId = process.env.REACT_APP_YANDEX_CLIENT_ID;

            this.url = "https://oauth.yandex.ru/authorize" +
                "?response_type=code" +
                `&client_id=${clientId}` +
                "&force_confirm=yes";
        }
    }
}

export class GoogleConsentScreen extends OauthConsentScreen {
    constructor (url = null) {
        super("Google", url);

        if (!url) {
            const clientId = process.env.REACT_APP_YANDEX_CLIENT_ID;
            const redirectUri = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI;

            const scopes = [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/plus.login"
            ];

            this.url = "https://accounts.google.com/o/oauth2/v2/auth" +
                "?response_type=code" +
                `&client_id=${clientId}` +
                `&redirect_uri=${redirectUri}` +
                `&scope=${scopes.join(" ")}`;
        }
    }
}

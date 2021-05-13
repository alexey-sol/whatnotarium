import {
    ALREADY_EXISTS,
    CONFLICT,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    INVALID_CREDENTIALS,
    INVALID_PASSWORD,
    NOT_FOUND,
    NOT_VERIFIED
} from "utils/const/validationErrors";

import {
    ACCESS_DENIED,
    INVALID_CLIENT,
    INVALID_GRANT,
    INVALID_REQUEST,
    INVALID_SCOPE,
    UNAUTHORIZED_CLIENT
} from "utils/const/oauthErrors";

import {
    OAUTH_ERROR,
    POST_ERROR,
    USER_ERROR,
    USER_TOKEN_ERROR
} from "utils/const/errorNames";

function translateError (error) {
    if (!error) {
        return "";
    }

    const { message, name } = error;

    if (name === POST_ERROR) {
        return translatePostError(message);
    } else if (name === USER_ERROR) {
        return translateUserError(message);
    } else if (name === USER_TOKEN_ERROR) {
        return translateUserTokenError(message);
    } else if (name === OAUTH_ERROR) {
        return translateOauthError(message);
    } else {
        return translateCommonError(message);
    }
}

export default translateError;

function translatePostError (message) {
    switch (message) {
        case ALREADY_EXISTS:
            return "Статья с таким ID уже есть";
        case FORBIDDEN:
            return "Изменение запрещено";
        case NOT_FOUND:
            return "Статья не найдена";
        default:
            return message;
    }
}

function translateUserError (message) {
    switch (message) {
        case ALREADY_EXISTS:
            return "Такой email уже занят";
        case FORBIDDEN:
            return "Доступ запрещен";
        case INVALID_CREDENTIALS:
            return "Неверные учетные данные";
        case INVALID_PASSWORD:
            return "Неверный пароль";
        case NOT_FOUND:
            return "Пользователь не найден";
        case NOT_VERIFIED:
            return "Email не подтвержден";
        default:
            return message;
    }
}

function translateUserTokenError (message) {
    switch (message) {
        case CONFLICT:
            return "Email уже подтвержден";
        case FORBIDDEN:
            return "Срок действия токена истек";
        case NOT_FOUND:
            return "Токен не найден";
        default:
            return message;
    }
}

function translateOauthError (message) {
    switch (message) {
        case ACCESS_DENIED:
            return "Приложению отказано в доступе";
        case INVALID_CLIENT:
            return "Приложение не найдено или заблокировано";
        case INVALID_GRANT:
            return "Неверный или просроченный код подтверждения";
        case INVALID_REQUEST:
            return "Неверный формат запроса";
        case INVALID_SCOPE:
            return "Права приложения изменились после генерации кода подтверждения";
        case UNAUTHORIZED_CLIENT:
            return "Приложение ожидает модерации или заблокировано";
        default:
            return message;
    }
}

function translateCommonError (message) {
    switch (message) {
        case INTERNAL_SERVER_ERROR:
            return "Что-то пошло не так";
        default:
            return message;
    }
}

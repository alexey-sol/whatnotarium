import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH,
    EMAIL_EMPTY,
    EMAIL_INVALID,
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT,
    NOT_FOUND,
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "utils/const/validationErrors";

import {
    ALREADY_EXISTS,
    EMAIL_OCCUPIED,
    INTERNAL_SERVER_ERROR,
    INVALID_CREDENTIALS,
    INVALID_PASSWORD
} from "utils/const/serverErrors";

import { POST_ERROR, USER_ERROR } from "utils/const/errorNames";

function translateError (error) {
    if (!error) {
        return "";
    }

    const { message, name } = error;

    if (name === POST_ERROR) {
        return translatePostError(message);
    } else if (name === USER_ERROR) {
        return translateUserError(message);
    } else {
        return translateCommonError(message);
    }
}

export default translateError;

function translatePostError (message) {
    switch (message) {
        case ALREADY_EXISTS:
            return "Статья с таким ID уже есть";
        case NOT_FOUND:
            return "Статья не найдена";
        default:
            return message;
    }
}

function translateUserError (message) {
    switch (message) {
        case ALREADY_EXISTS:
        case EMAIL_OCCUPIED:
            return "Такой email уже занят";
        case CONFIRM_PASSWORD_EMPTY:
            return "Пожалуйста, введите пароль еще раз";
        case CONFIRM_PASSWORD_NOT_MATCH:
            return "Пароли не совпадают";
        case EMAIL_EMPTY:
            return "Пожалуйста, укажите email";
        case EMAIL_INVALID:
            return "Указан некорректный email";
        case INVALID_CREDENTIALS:
            return "Неверные учетные данные";
        case INVALID_PASSWORD:
            return "Неверный пароль";
        case NAME_EMPTY:
            return "Пожалуйста, укажите имя";
        case NAME_TOO_LONG:
            return "Имя слишком длинное";
        case NAME_TOO_SHORT:
            return "Имя слишком короткое";
        case PASSWORD_EMPTY:
            return "Пожалуйста, введите пароль";
        case PASSWORD_TOO_WEAK:
            return "Пожалуйста, придумайте пароль посложнее (*)";
        default:
            return message;
    }
}

function translateCommonError (message) {
    switch (message) {
        case INTERNAL_SERVER_ERROR:
            return "Что-то полшло не так";
        default:
            return message;
    }
}

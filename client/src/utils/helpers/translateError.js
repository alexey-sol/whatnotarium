import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH,
    EMAIL_EMPTY,
    EMAIL_INVALID,
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT,
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "utils/const/validationErrors";

import {
    ALREADY_EXISTS,
    EMAIL_OCCUPIED,
    INTERNAL_SERVER_ERROR,
    INVALID_CREDENTIALS,
    INVALID_PASSWORD,
    NO_USER_FOUND
} from "utils/const/serverErrors";

function translateError (error) {
    if (!error) {
        return "";
    }

    switch (error) {
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
        case INTERNAL_SERVER_ERROR:
            return "Что-то пошло не так";
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
        case NO_USER_FOUND:
            return "Пользователь не найден";
        case PASSWORD_EMPTY:
            return "Пожалуйста, введите пароль";
        case PASSWORD_TOO_WEAK:
            return "Пожалуйста, придумайте пароль посложнее (*)";
        default:
            return error;
    }
}

export default translateError;

import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH,
    EMAIL_EMPTY,
    EMAIL_INVALID,
    EMAIL_OCCUPIED,
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT,
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "common/constants/validationErrors";

function translateError (error = "") {
    switch (error) {
        case CONFIRM_PASSWORD_EMPTY:
            return "Пожалуйста, введите пароль еще раз";
        case CONFIRM_PASSWORD_NOT_MATCH:
            return "Пароли не сопадают";
        case EMAIL_EMPTY:
            return "Пожалуйста, укажите email";
        case EMAIL_INVALID:
            return "Указан некорректный email";
        case EMAIL_OCCUPIED:
            return "Такой email уже занят";
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
            return null;
    }
}

export default translateError;

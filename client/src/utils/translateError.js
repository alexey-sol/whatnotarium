import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH,
    EMAIL_EMPTY,
    EMAIL_INVALID,
    EMAIL_OCCUPIED,
    NAME_EMPTY,
    NAME_TOO_LONG,
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "constants/validationErrors";

function translateError (error) {
    switch (error) {
        case CONFIRM_PASSWORD_EMPTY:
            return "Пожалуйста, введите пароль";
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
        case PASSWORD_EMPTY:
            return "Пожалуйста, укажите пароль";
        case PASSWORD_TOO_WEAK:
            return "Пожалуйста, придумайте пароль посложнее - не менее 6 " +
                "символов";
        default:
            return "Что-то пошло не так";
    }
}

export default translateError;

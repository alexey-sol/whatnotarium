// import {
//     EMAIL_EMPTY,
//     EMAIL_INVALID
// } from "utils/const/validationErrors";
//
// import { USER_ERROR } from "utils/const/errorNames";

function validateEmail (email = "") {
    // const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    // const normalizedEmail = `${email}`.toLowerCase();
    // const isValid = emailRegExp.test(normalizedEmail);
    //
    // if (email.length === 0) {
    //     return {
    //         message: EMAIL_EMPTY,
    //         name: USER_ERROR
    //     };
    // } else if (!isValid) {
    //     return {
    //         message: EMAIL_INVALID,
    //         name: USER_ERROR
    //     };
    // } else {
    //     return null;
    // }
}

export default validateEmail;

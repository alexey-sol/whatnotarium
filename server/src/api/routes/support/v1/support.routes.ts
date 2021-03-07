import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get( // TODO: ONLY for resend email purposes (auxiliary endpoint)
    "/confirm",
    schemaValidation.sendConfirmToken,
    dataValidation.sendConfirmToken,
    controllers.sendConfirmToken
);

router.post(
    // "/confirm/:token",
    "/confirm",
    schemaValidation.confirmEmail,
    dataValidation.confirmEmail,
    controllers.confirmEmail
);

router.post(
    "/reset",
    // schemaValidation.sendResetToken, // redirect to page if token is wrong, not just send json
    // dataValidation.sendResetToken, // redirect to page if token is wrong, not just send json
    // controllers.sendResetToken
);

router.get(
    "/reset/:token",
    schemaValidation.checkResetToken,
    dataValidation.checkResetToken,
    // controllers.checkResetToken
);

router.put(
    "/reset",
    // schemaValidation.checkResetToken, // redirect to page if token is wrong, not just send json
    // dataValidation.checkResetToken, // redirect to page if token is wrong, not just send json
    // controllers.checkResetToken
);



export default router;

// TODO: confirm
// 1) after submitting the signing up form, client gets 201 and renders in modal/page: "You've signed up, but you must confirm your email..."
//    So meanwhile backend sends email with link: GET https://site.com/support/confirm?token=f27a7n5va1
// 2) user opens email and clicks the link;
//    They get to the page which receives "token" parameter. In the background, request to POST "https://site.com/api/v1/support/confirm { token: f27a7n5va1 }"
//    is sent
// 3) API says: ok (and creates session for user) | error
//    OK? Render "You've confirmed your email". Then after 3 sec redirect to home page
//    Error? Render error message. And add link "resend ver email" (backend searhces user using token) -> redirect to home page (add notification "email's been sent")

// TODO: confirm (old)
// 1) after submitting the signing up form, client gets 201 and renders in modal/page: "You've signed up, but you must confirm your email..."
//    So meanwhile backend sends email with link: GET https://site.com/api/v1/support/confirm?token=f27a7n5va1
// 2) user opens email and clicks the link; then backend tries to find the user by given token (f27a7n5va1).
//    If not found (or expDate has expired): redirect to page "not exist or expired, try resend email by clicking...": https://site.com/support/confirm-token-error
//    If found: attach session to req and redirect to home page
// 3) TODO: what if expired?
// When signing in (email's not confirmed) render route "https://site.com/support/confirm-token-error" allowing to resend confirm email

// backend routes:
// - POST https://site.com/api/v1/support/confirm { token: f27a7n5va1 }

// frontend routes:
// - https://site.com/support/confirm


// old
// backend routes:
// - GET https://site.com/api/v1/support/confirm?token=f27a7n5va1

// old
// frontend routes:
// - https://site.com/support/confirm-token-error
// - https://site.com/support/reset-token-error



// TODO: reset
// 1) click "forgot pass". Is rendered route https://site.com/support/reset (exact).
//    Input there email and send it to POST https://site.com/api/v1/support/reset (only email field)
// 2) backend: find user via email.
//    If not found: send 404 (front should render: not found user with this email).
//    If found: send email with link (front should render "check your mail"): GET https://site.com/api/v1/support/reset?token=f27a7n5va1
// 3) user opens email and clicks the link; then backend tries to find the user by given token (f27a7n5va1).
//    If not found (or expDate has expired): redirect to page "token isn't valid or has expired": https://site.com/support/reset-token-error
//    If found: redirect to page with form "input your new passowrd". There's no session yet. https://site.com/support/reset/f27a7n5va1
// 4) user submits the form to PUT https://site.com/api/v1/support/reset (fields: password, token).
//    Backend again checks token and expDate.
//    If they're wrong, returns "token isn't valid or has expired".
//    If ok, updates the user model and returns "password has been changed, now you can sign in"

// backend routes:
// - POST https://site.com/api/v1/support/reset
// - GET https://site.com/api/v1/support/reset?token=f27a7n5va1
// - PUT https://site.com/api/v1/support/reset

// frontend routes:
// - https://site.com/support/reset (exact)
// - https://site.com/support/reset/f27a7n5va1
// - https://site.com/support/reset-token-error

// https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11984576#overview
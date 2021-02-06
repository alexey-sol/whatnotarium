import express from "express";

import controllers from "./controllers";
// import dataValidation from "./dataValidation";
// import middlewares from "#api/middlewares";
// import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/confirm/:token",
    // schemaValidation.confirmEmail, // redirect to page if token is wrong, not just send json
    // dataValidation.confirmEmail, // redirect to page if token is wrong, not just send json
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
    // schemaValidation.checkResetToken, // redirect to page if token is wrong, not just send json
    // dataValidation.checkResetToken, // redirect to page if token is wrong, not just send json
    // controllers.checkResetToken
);

router.put(
    "/reset",
    // schemaValidation.resetPassword, // redirect to page if token is wrong, not just send json
    // dataValidation.resetPassword, // redirect to page if token is wrong, not just send json
    controllers.resetPassword
);



export default router;

// TODO: create view combining both tokens, "userMeta"?

// TODO: confirm
// 1) after submitting the signing up form, client gets 200 and renders in modal/page: "You've signed up, but you must confirm your email..."
//    So meanwhile backend sends email with link: GET https://site.com/api/v1/support/confirm?token=f27a7n5va1
// 2) user opens email and clicks the link; then backend tries to find the user by given token (f27a7n5va1).
//    If not found (or expDate has expired): redirect to page "token isn't valid or has expired": https://site.com/support/token-error
//    If found: attach session to req and redirect to home page

// backend routes:
// - GET https://site.com/api/v1/support/confirm?token=f27a7n5va1

// frontend routes:
// - https://site.com/support/token-error - same for reset

// TODO: reset
// 1) click "forgot pass". Is rendered route https://site.com/support/reset (exact).
//    Input there email and send it to POST https://site.com/api/v1/support/reset (only email field)
// 2) backend: find user via email.
//    If not found: send 404 (front should render: not found user with this email).
//    If found: send email with link (front should render "check your mail"): GET https://site.com/api/v1/support/reset?token=f27a7n5va1
// 3) user opens email and clicks the link; then backend tries to find the user by given token (f27a7n5va1).
//    If not found (or expDate has expired): redirect to page "token isn't valid or has expired": https://site.com/support/token-error
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
// - https://site.com/support/token-error

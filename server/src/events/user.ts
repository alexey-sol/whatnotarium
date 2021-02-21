import { EventEmitter } from "events";

import * as eventNames from "#utils/const/events/user";
import { ERROR } from "#utils/const/events/common";
import ProcessManager from "#utils/helpers/ProcessManager";
import emailTransporter from "#emailTransporter";
import emailTransporterConfig from "#config/emailTransporter";
import logger from "#logger";
import serverConfig from "#config/server";
import Version from "#utils/helpers/Version";

const emitter = new EventEmitter();
const { processEnv } = new ProcessManager();

const { PROJECT_NAME_FULL: projectName } = processEnv;
const { senderEmail } = emailTransporterConfig;
const { url } = serverConfig;

const appMajorVersion = Version.getMajorVersion();
const apiRoute = `${url}/api/v${appMajorVersion}`;

emitter.on(eventNames.SEND_CONFIRM_EMAIL, async ({ email, token }) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Добро пожаловать на ${projectName}! А теперь подтвердите email`,
            html: `
                Чтобы ваш аккаунт стал действительным, пожалуйста, перейдите по ссылке ниже.<br>
                <a href='${apiRoute}/support/confirm?token=${token}'>Подтвердить email</a>
            `
        });

        logger.info(response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(eventNames.SEND_POST_WAITING_APPROVAL, async ({ email, postId, postTitle }) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Ваша статья "${postTitle}" на Geek Regime ожидает проверки`,
            html: `
                Добрый день! Перед публикацией мы должны проверить вашу статью "${postTitle}":
                это может занять день или два. Если возникнут какие-то загвоздки, мы напишем
                вам, и вы сможете внести в статью необходимые правки и отправить на повторную
                проверку.
                <a href="${apiRoute}/post/${postId}">Перейти к статье</a>
            `
        });

        logger.info(response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(eventNames.SEND_POST_APPROVED, async ({ email, postId, postTitle }) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Ваша статья "${postTitle}" на Geek Regime опубликована`,
            html: `
                Поздравляем! Ваша статья "${postTitle}" прошла проверку и была опубликована.<br>
                <a href="${apiRoute}/post/${postId}">Перейти к статье</a>
            `
        });

        logger.info(response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(eventNames.SEND_POST_REJECTED, async ({
    email,
    message,
    postId,
    postTitle
}) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Ваша статья "${postTitle}" на Geek Regime пока отклонена`,
            html: `
                Добрый день, мы пока отклонили вашу статью "${postTitle}" на Geek Regime.
                Причина следующая:<br>${message}<br>
                Вы можете внести правки и отправить на проверку еще раз.<br>
                <a href="${apiRoute}/post/${postId}">Перейти к статье</a>
            `
        });

        logger.info(response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(ERROR, (error) => logger.error(error));

export default emitter;

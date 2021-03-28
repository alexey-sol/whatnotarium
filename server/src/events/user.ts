import { EventEmitter } from "events";

import * as eventNames from "#utils/const/events/user";
import { ERROR } from "#utils/const/events/common";
import ProcessManager from "#utils/wrappers/ProcessManager";
import emailTransporter from "#emailTransporter";
import emailTransporterConfig from "#config/emailTransporter";
import logger from "#logger";
import serverConfig from "#config/server";

const emitter = new EventEmitter();
const { processEnv } = new ProcessManager();

const { PROJECT_NAME_FULL: projectName } = processEnv;
const { senderEmail } = emailTransporterConfig;
const { url } = serverConfig;

emitter.on(eventNames.SEND_CONFIRM_EMAIL, async ({ email, token }) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Добро пожаловать на ${projectName}! А теперь подтвердите email`,
            html: `
                <p>Чтобы ваш аккаунт стал действительным, пожалуйста, перейдите по ссылке ниже.</p>
                <p><a href='${url}/support/confirm/token/${token}'>Подтвердить email</a></p>
            `
        });

        logger.info("SEND_CONFIRM_EMAIL response", response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(eventNames.SEND_POST_WAITING_APPROVAL, async ({ email, postId, postTitle }) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Ваша статья "${postTitle}" на ${projectName} ожидает проверки`,
            html: `
                <p>Добрый день! Перед публикацией мы должны проверить вашу статью "${postTitle}":
                это может занять день или два. Если возникнут какие-то загвоздки, мы напишем
                вам, и вы сможете внести в статью необходимые правки и отправить на повторную
                проверку.</p>
                <p><a href="${url}/post/${postId}">Перейти к статье</a></p>
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
            subject: `Ваша статья "${postTitle}" на ${projectName} опубликована`,
            html: `
                <p>Поздравляем! Ваша статья "${postTitle}" прошла проверку и была опубликована.</p>
                <p><a href="${url}/post/${postId}">Перейти к статье</a></p>
            `
        });

        logger.info(response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(eventNames.SEND_POST_REJECTED, async ({
    email,
    message = "Причина не указана",
    postId,
    postTitle
}) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Ваша статья "${postTitle}" на ${projectName} пока отклонена`,
            html: `
                <p>Добрый день, мы пока отклонили вашу статью "${postTitle}" на ${projectName}.
                Причина следующая:</p>
                <p>${message}</p>
                <p>Вы можете внести правки и отправить на проверку еще раз.</p>
                <p><a href="${url}/post/${postId}">Перейти к статье</a></p>
            `
        });

        logger.info(response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(eventNames.SEND_RESET_PASSWORD_EMAIL, async ({ email, token }) => {
    try {
        const response = await emailTransporter.send({
            to: email,
            from: senderEmail,
            subject: `Восстановление пароля на ${projectName}`,
            html: `
                <p>Чтобы восстановить пароль, пожалуйста, перейдите по ссылке ниже.
                Если вы получили это письмо случайно, проигнорируйте его.</p>
                <p><a href='${url}/support/reset/token/${token}'>Начать процедуру
                восстановления</a></p>
            `
        });

        logger.info("SEND_RESET_PASSWORD_EMAIL response", response);
    } catch (error) {
        emitter.emit(ERROR, error);
    }
});

emitter.on(ERROR, (error) => logger.error(error));

export default emitter;

import { join } from "path";
import { createLogger, format, transports } from "winston";

import { DEBUG, ERROR } from "constants/loggingLevels";
import DateFormatter from "utils/DateFormatter";

const { combine, errors, prettyPrint, timestamp } = format;
const dateTimeFormatPattern = "YYYY-MM-DD HH:mm:ss";

const logger = createLogger({
    format: getCombinedFormat(),
    transports: createWinstonTransports(),
    exitOnError: false
});

export default logger;

function getCombinedFormat () {
    return combine(
        errors({ stack: true }),
        timestamp({ format: dateTimeFormatPattern }),
        prettyPrint()
    );
}

function createWinstonTransports () {
    return [
        new transports.File(getFileOptionsForLevel(ERROR)),
        new transports.File(getFileOptionsForLevel(DEBUG)),
        new transports.Console(getConsoleOptions())
    ];
}

function getFileOptionsForLevel (
    level: typeof ERROR | typeof DEBUG
) {
    const root = process.cwd();
    const logsDirPath = join(root, "logs")

    return {
        colorize: false,
        filename: join(logsDirPath, `${level}.log`),
        handleExceptions: true,
        json: true,
        level,
        maxsize: convertMbToBytes(5),
        maxFiles: 5
    };
}

function convertMbToBytes (mb: number) {
    return mb * 1024 ** 2;
}

function getConsoleOptions () {
    return {
        colorize: true,
        format: getConsoleFormat(),
        handleExceptions: true,
        json: false,
        level: DEBUG
    };
}

function getConsoleFormat () {
    const printToConsole = format.printf(formatConsoleLog);

    return format.combine(
        format.colorize(),
        printToConsole
    );
}

function formatConsoleLog (info: any) {
    const date = new DateFormatter()
        .formatByPattern(dateTimeFormatPattern);

    const infoContent = (info.stack)
        ? `${info.stack}\n`
        : `${info.message}\n`;

    return `${date} ${info.level}: ${infoContent}`;
}

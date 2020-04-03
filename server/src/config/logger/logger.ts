import { Format } from "logform";
import { createLogger, format, transports } from "winston";
import { join } from "path";

import { DEBUG, ERROR } from "const/loggingLevels";
import { PRODUCTION } from "const/nodeEnv";
import DateFormatter from "utils/formatters/DateFormatter";

const { combine, errors, prettyPrint, timestamp } = format;
const dateTimeFormatPattern = "YYYY-MM-DD HH:mm:ss";

const logger = createLogger({
    format: getCombinedFormat(),
    transports: createWinstonTransports(),
    exitOnError: false
});

export default logger;

function getCombinedFormat (): Format {
    return combine(
        errors({ stack: true }),
        timestamp({ format: dateTimeFormatPattern }),
        prettyPrint()
    );
}

type WinstonTransports = (
    transports.FileTransportInstance |
    transports.ConsoleTransportInstance
)[];

function createWinstonTransports (): WinstonTransports {
    const result: WinstonTransports = [];

    const nodeEnv = process.env.NODE_ENV?.trim();
    const isProduction = nodeEnv === PRODUCTION;

    if (isProduction) {
        pushFileOptionsTo(result);
    }

    pushConsoleOptionsTo(result);
    return result;
}

function pushFileOptionsTo (
    loggerTransports: WinstonTransports
): void {
    loggerTransports.push(
        new transports.File(getFileOptionsForLevel(ERROR)),
        new transports.File(getFileOptionsForLevel(DEBUG))
    );
}

function pushConsoleOptionsTo (
    loggerTransports: WinstonTransports
): void {
    loggerTransports.push(
        new transports.Console(getConsoleOptions())
    );
}

function getFileOptionsForLevel (
    level: typeof ERROR | typeof DEBUG
): transports.FileTransportOptions {
    const root = process.cwd();
    const logsDirPath = join(root, "logs");

    return {
        filename: join(logsDirPath, `${level}.log`),
        handleExceptions: true,
        level,
        maxsize: convertMbToBytes(5),
        maxFiles: 5
    };
}

function convertMbToBytes (mb: number): number {
    return mb * 1024 ** 2;
}

function getConsoleOptions (): transports.ConsoleTransportOptions {
    return {
        format: getConsoleFormat(),
        handleExceptions: true,
        level: DEBUG
    };
}

function getConsoleFormat (): Format {
    const printToConsole = format.printf(formatConsoleLog);

    return format.combine(
        format.colorize(),
        printToConsole
    );
}

function formatConsoleLog (info: any): string {
    const date = new DateFormatter()
        .formatByPattern(dateTimeFormatPattern);

    const infoContent = (info.stack)
        ? `${info.stack}\n`
        : `${info.message}\n`;

    return `${date} ${info.level}: ${infoContent}`;
}

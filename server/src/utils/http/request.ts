import https from "https";
import qs from "querystring";

import Indexer from "#types/Indexer";
import getObjectValueIgnoringKeyCase from "#utils/helpers/getObjectValueIgnoringKeyCase";
import isJSON from "#utils/helpers/isJSON";

async function request (
    options: https.RequestOptions,
    data?: Indexer<unknown>
): Promise<Indexer<unknown> | string> {
    return new Promise((resolve, reject) => {
        const clientRequest = https.request(options, (message) => {
            let resData = "";

            message.on("data", (chunk) => {
                resData += chunk;
            });

            message.on("end", () => {
                if (isJSON(resData)) {
                    resData = JSON.parse(resData);
                }

                resolve(resData);
            });
        });

        if (data) {
            const { headers = {} } = options;
            const contentType = getObjectValueIgnoringKeyCase(headers, "content-type");

            const isForm = contentType && (contentType as string)
                .toLowerCase()
                .includes("application/x-www-form-urlencoded");

            const stringifiedData = (isForm)
                ? qs.stringify(data as qs.ParsedUrlQueryInput)
                : JSON.stringify(data);

            clientRequest.write(stringifiedData);
        }

        clientRequest.on("error", reject);
        clientRequest.end();
    });
}

export default request;

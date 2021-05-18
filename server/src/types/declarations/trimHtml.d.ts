declare module "trim-html" {
    interface Options {
        limit: number;
    }

    interface Result {
        html: string;
        more: boolean;
    }

    export default function (html: string, options?: Options): Result;
}

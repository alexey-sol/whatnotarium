import express from "express";

import envLoader from "./env";
import expressLoader from "./express";
import pgLoader from "./pg";

function init (app: express.Application): void {
    envLoader();
    const pg = pgLoader();
    expressLoader({ app, pg });
}

export default {
    init
};

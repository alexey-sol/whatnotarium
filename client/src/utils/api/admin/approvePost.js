import superagent from "superagent";

import { APPROVED } from "utils/const/postStatuses";

async function approvePost ({ id }) {
    const response = await superagent
        .put(`/api/v1/admin/posts/${id}`)
        .set("Content-Type", "application/json")
        .send({ status: APPROVED });

    return response?.body;
}

export default approvePost;

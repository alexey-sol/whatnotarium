import superagent from "superagent";

import { NOT_APPROVED } from "utils/const/postStatuses";

async function rejectPost ({ id }) {
    const response = await superagent
        .put(`/api/v1/admin/posts/${id}`)
        .set("Content-Type", "application/json")
        .send({ status: NOT_APPROVED });

    return response?.body;
}

export default rejectPost;

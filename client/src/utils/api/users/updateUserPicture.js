import superagent from "superagent";

import convertObjectToFormData from "utils/helpers/convertObjectToFormData";

async function updateUserPicture ({ id, picture }) {
    const dataIfAny = (picture)
        ? convertObjectToFormData({ picture })
        : null;

    const response = await superagent
        .put(`/api/v1/user/${id}/picture`)
        .send(dataIfAny);

    return response?.body;
}

export default updateUserPicture;

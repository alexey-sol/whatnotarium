import { createTransform } from "redux-persist";

import convertObjectToMap from "utils/helpers/convertObjectToMap";

const transformStateItemsMap = createTransform(
    (inboundState) => ({
        ...inboundState,
        items: JSON.stringify(inboundState)
    }),
    (outboundState) => ({
        ...outboundState,
        items: convertObjectToMap(JSON.parse(outboundState.items))
    })
);

export default transformStateItemsMap;

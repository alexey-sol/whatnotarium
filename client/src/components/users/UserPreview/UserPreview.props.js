import {
    number,
    object,
    string
} from "prop-types";

export const propTypes = {
    createdAt: string.isRequired,
    id: number.isRequired,
    profile: object.isRequired
};

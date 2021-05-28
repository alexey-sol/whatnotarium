import {
    bool,
    number,
    object,
    string
} from "prop-types";

export const propTypes = {
    createdAt: string.isRequired,
    id: number.isRequired,
    isConfirmed: bool.isRequired,
    profile: object.isRequired
};

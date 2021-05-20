import { object, number, string } from "prop-types";

export const defaultProps = {
    createdAt: "",
    updatedAt: ""
};

export const propTypes = {
    createdAt: string,
    updatedAt: string,
    user: object.isRequired,
    userId: number
};

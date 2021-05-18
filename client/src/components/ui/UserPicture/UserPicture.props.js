import { func, object, string } from "prop-types";

export const defaultProps = {
    name: "",
    onClick: null,
    picture: null,
    rootClassName: ""
};

export const propTypes = {
    name: string,
    onClick: func,
    picture: object,
    rootClassName: string
};

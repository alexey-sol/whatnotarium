import {
    bool,
    func,
    oneOf,
    string
} from "prop-types";

export const defaultProps = {
    className: "",
    disabled: false,
    theme: "light",
    type: "submit",
    width: "auto"
};

export const propTypes = {
    className: string,
    disabled: bool,
    onClick: func,
    text: string.isRequired,
    theme: oneOf(["light", "dark", "neutral"]),
    type: string,
    width: oneOf(["auto", "full"])
};

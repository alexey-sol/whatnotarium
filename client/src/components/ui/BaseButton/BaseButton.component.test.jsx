import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import BaseButton from "./BaseButton.component";

it("should render BaseButton", () => {
    const wrapper = shallow(
        <BaseButton text="Click me" />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
});

it("should render with only required props supplied", () => {
    const wrapper = shallow(
        <BaseButton text="Click me" />
    );

    const props = wrapper.props();

    expect(props.children).toBe("Click me");
    expect(props.className).toBe("button autoWidth lightTheme");
    expect(props.disabled).toBe(false);
    expect(props.onClick).toBe(undefined);
    expect(props.type).toBe("submit");
});

it("should render with optional props supplied", () => {
    const mockProps = {
        className: "testClass",
        disabled: false,
        onClick: jest.fn(),
        text: "Click me",
        theme: "dark",
        type: "reset",
        width: "full"
    };

    const wrapper = shallow(
        <BaseButton {...mockProps} />
    );

    const props = wrapper.props();

    expect(props.children).toBe("Click me");
    expect(props.className).toBe("button fullWidth testClass darkTheme");
    expect(props.disabled).toBe(false);
    expect(props.onClick).toBe(mockProps.onClick);
    expect(props.type).toBe("reset");

    wrapper.simulate("click");
    wrapper.simulate("click");

    expect(mockProps.onClick).toBeCalledTimes(2);
});

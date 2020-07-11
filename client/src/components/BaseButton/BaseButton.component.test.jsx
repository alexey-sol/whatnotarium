import React from "react";
import { mount } from "enzyme";

import BaseButton from "./BaseButton.component";

it("should render with no optional props supplied", () => {
    const wrapper = mount(<BaseButton text="Click me" />);

    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.prop("className")).toBe("");
    expect(wrapper.prop("disabled")).toBe(false);
    expect(wrapper.prop("onClick")).toBe(undefined);
    expect(wrapper.prop("text")).toBe("Click me");
    expect(wrapper.prop("theme")).toBe("light");
    expect(wrapper.prop("type")).toBe("submit");
    expect(wrapper.prop("width")).toBe("auto");
});

it("should render with optional props supplied", () => {
    const onClick = jest.fn();

    const wrapper = mount(
        <BaseButton
            className="testClass"
            disabled={false}
            onClick={onClick}
            text="Click me"
            theme="dark"
            type="reset"
            width="full"
        />
    );

    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.prop("className")).toBe("testClass");
    expect(wrapper.prop("disabled")).toBe(false);
    expect(wrapper.prop("onClick")).toBe(onClick);
    expect(wrapper.prop("text")).toBe("Click me");
    expect(wrapper.prop("theme")).toBe("dark");
    expect(wrapper.prop("type")).toBe("reset");
    expect(wrapper.prop("width")).toBe("full");

    wrapper.simulate("click");
    wrapper.simulate("click");

    expect(onClick).toBeCalledTimes(2);
});

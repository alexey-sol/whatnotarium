import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { App } from "./App.component";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Main from "components/layout/Main";
import Menu from "components/layout/Menu";

let wrapper = null;

beforeEach(() => {
    const mockProps = {
        onCheckSessionStart: jest.fn(),
        onFetchPostsStart: jest.fn()
    };

    wrapper = shallow(
        <App {...mockProps} />
    );
});

it("should render App", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
});

it("should render child components", () => {
    const header = wrapper.find(Header);
    const menu = wrapper.find(Menu);
    const main = wrapper.find(Main);
    const footer = wrapper.find(Footer);

    expect(header.exists()).toBe(true);
    expect(menu.exists()).toBe(true);
    expect(main.exists()).toBe(true);
    expect(footer.exists()).toBe(true);
});

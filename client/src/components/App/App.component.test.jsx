import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { App } from "./App.component";
import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Nav from "components/Nav";

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
    const nav = wrapper.find(Nav);
    const main = wrapper.find(Main);
    const footer = wrapper.find(Footer);

    expect(header.exists()).toBe(true);
    expect(nav.exists()).toBe(true);
    expect(main.exists()).toBe(true);
    expect(footer.exists()).toBe(true);
});

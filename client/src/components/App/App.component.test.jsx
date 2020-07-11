import React from "react";
import { shallow } from "enzyme";

import { App } from "./App.component";
import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Nav from "components/Nav";

it("should render child components", () => {
    const mock = jest.fn();

    const component = (
        <App
            onCheckSessionStart={mock}
            onFetchPostsStart={mock}
        />
    );

    const wrapper = shallow(component);

    const header = wrapper.find(Header);
    const nav = wrapper.find(Nav);
    const main = wrapper.find(Main);
    const footer = wrapper.find(Footer);

    expect(header.exists()).toBe(true);
    expect(nav.exists()).toBe(true);
    expect(main.exists()).toBe(true);
    expect(footer.exists()).toBe(true);
});

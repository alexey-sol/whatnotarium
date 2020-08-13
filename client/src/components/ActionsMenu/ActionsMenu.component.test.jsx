import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { ActionsMenu } from "./ActionsMenu.component";
import { SignInDialog, SignUpDialog } from "components/Dialog";

import {
    UserIconButton
} from "components/IconButton";

it("should render ActionsMenu", () => {
    const wrapper = shallow(
        <ActionsMenu showUserMenu={jest.fn()} />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
});

it("should render SignInDialog with truthy initialSignInIsShown prop supplied", () => {
    const wrapper = shallow(
        <ActionsMenu
            initialSignInIsShown
            showUserMenu={jest.fn()}
        />
    );

    const signInDialog = wrapper.find(SignInDialog);
    expect(signInDialog.exists()).toBe(true);
});

it("should render SignUpDialog with truthy initialSignUpIsShown prop supplied", () => {
    const wrapper = shallow(
        <ActionsMenu
            initialSignUpIsShown
            showUserMenu={jest.fn()}
        />
    );

    const signUpDialog = wrapper.find(SignUpDialog);
    expect(signUpDialog.exists()).toBe(true);
});

it("should not render SignInDialog nor SignUpDialog by default", () => {
    const wrapper = shallow(
        <ActionsMenu showUserMenu={jest.fn()} />
    );

    const signInDialog = wrapper.find(SignInDialog);
    const signUpDialog = wrapper.find(SignUpDialog);
    expect(signInDialog.exists()).toBe(false);
    expect(signUpDialog.exists()).toBe(false);
});

it("should render SignInDialog when clicking on UserIconButton if currentUser prop is not provided", () => {
    const wrapper = shallow(
        <ActionsMenu showUserMenu={jest.fn()} />
    );

    const userIconButton = wrapper.find(UserIconButton);
    userIconButton.simulate("click");

    const signInDialog = wrapper.find(SignInDialog);
    expect(signInDialog.exists()).toBe(true);
});

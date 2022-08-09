import React from "react";
import { mount } from "enzyme";
import Form from "./Form";

describe("<Form />", () => {
  let wrapper;
  const setup = () => {
    wrapper = mount(<Form />);
  };
  it("should call onSubmit when form submitted and all inputs are valid", () => {
    setup();
    const mockProps = {
      onSubmit: jest.fn()
    };
    wrapper
      .find('input[name="to"]')
      .simulate("change", { target: { value: "tony@example.com" } });
    wrapper
      .find('input[name="subject"]')
      .simulate("change", { target: { value: "foo" } });
    wrapper
      .find('textarea[name="content"]')
      .simulate("change", { target: { value: "bar" } });
    wrapper.setProps(mockProps);
    wrapper.find("form").simulate("submit");
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });
  it("should call onCancel prop once when clicked cancel button", () => {
    setup();
    const mockProps = {
      submitting: true,
      onCancel: jest.fn()
    };
    wrapper
      .find('input[name="to"]')
      .simulate("change", { target: { value: "tony@example.com" } });
    wrapper
      .find('input[name="subject"]')
      .simulate("change", { target: { value: "foo" } });
    wrapper
      .find('textarea[name="content"]')
      .simulate("change", { target: { value: "bar" } });
    wrapper.setProps(mockProps);
    wrapper.find("#undo").simulate("click");
    expect(mockProps.onCancel).toHaveBeenCalledTimes(1);
  });
  it("should has error class when form submitted inputs are invalid", () => {
    setup();
    const mockProps = {
      onSubmit: jest.fn()
    };
    wrapper.find("form").simulate("submit");
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(0);
    expect(
      wrapper
        .find("input")
        .at(0)
        .parent()
        .hasClass("error")
    ).toBe(true);
    expect(
      wrapper
        .find("input")
        .at(1)
        .parent()
        .hasClass("error")
    ).toBe(true);
    expect(
      wrapper
        .find("textarea")
        .at(0)
        .parent()
        .hasClass("error")
    ).toBe(true);
  });
});

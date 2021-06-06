import React from "react";
import renderer from "react-test-renderer";
import BudgetsList from "./BudgetsList.js";
import DataTable from "../DataTable.js";

test("Link changes the class when hovered", () => {
    const component = renderer.create(<DataTable rows={[[]]} headers={[]} />);
});

//import React from "react";
//import { render, unmountComponentAtNode } from "react-dom";
//import { act } from "react-dom/test-utils";
//
//let container = null;
//beforeEach(() => {
//    container = document.createElement("div");
//    document.body.appendChild(container);
//});
//
//afterEach(() => {
//    unmountComponentAtNode(container);
//    container.remove();
//    container = null;
//});
//
//it("renders with or without a name", () => {
//    act(() => {
//        render(<DataTable rows={[[]]} headers={[]} />, container);
//    });
//    expect(container.textContent).toBe("Hey, stranger");
//});

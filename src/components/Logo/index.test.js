import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Logo from "./index";

describe("When a logo is called ", () => {
    const cases = [
        { description: "with size='large'", props: { size: "large" }, expected: { height: "60", width: "160" } },
        { description: "with size='small'", props: { size: "small" }, expected: { height: "60", width: "130" } },
        { description: "with no props", props: {}, expected: { height: "60", width: "130" } },
    ];

    it.each(cases)("renders correctly $description", ({ props, expected }) => {
        render(<Logo {...props} />);

        const logo = screen.getByTestId("logo");
        expect(logo.getAttribute("height")).toBe(expected.height);
        expect(logo.getAttribute("width")).toBe(expected.width);
    });
});


describe("When a logo is created", () => {
    it("each path has the correct MD5 hash", () => {
        render(<Logo size="large" />);

        const expected = [
            "68845c3c217e0e9b10a30768575a661a",
            "3c70333cc48a32e6cc6ef56b1dbaa0ba",
            "a5d60a0de8e34d0aeee9abb794d44f4d",
            "9a082d9c01e2ce103bb8cd4dd0d931f8",
            "73c242385772a07686265a481c3eae8a",
            "5206200bcb30b43d3a39faae65405c5a",
        ];

        expected.forEach((hash, index) => {
            const pathEl = screen.getByTestId(`path${index + 1}`);
            const d = pathEl.getAttribute("d");
            expect(md5(d)).toBe(hash);
        });
    });
});
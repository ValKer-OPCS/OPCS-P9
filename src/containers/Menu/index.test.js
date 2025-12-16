import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

beforeEach(() => {
  delete window.location;
  window.location = { hash: "" };
});

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on menu button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });

    it("document location  href change", async () => {
      render(<Menu />);
      const servicesLink = await screen.findByText("Nos services");
      fireEvent.click(servicesLink);
      window.location.hash = servicesLink.getAttribute("href");

      expect(window.location.hash).toBe("#nos-services");
    });

    it("document location  href change", async () => {
      render(<Menu />);
      const servicesLink = await screen.findByText("Nos réalisations");
      fireEvent.click(servicesLink);
      window.location.hash = servicesLink.getAttribute("href");

      expect(window.location.hash).toBe("#nos-realisations");
    });

    it("document location  href change", async () => {
      render(<Menu />);
      const servicesLink = await screen.findByText("Notre équipe");
      fireEvent.click(servicesLink);
      window.location.hash = servicesLink.getAttribute("href");

      expect(window.location.hash).toBe("#notre-equipe");
    });
  });


});

import { fireEvent, render, screen, within, act } from "@testing-library/react";
import Home from "./index";
import { DataProvider, api } from "../../contexts/DataContext";


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

const data = {
  events: [
    { id: 1, title: "Event 1", date: "2023-01-01", cover: "/event1.png", type: "conférence" },
    { id: 2, title: "Event 2", date: "2023-02-01", cover: "/event2.png", type: "soirée" },
    { id: 3, title: "Event 3", date: "2023-03-01", cover: "/event3.png", type: "soirée" },
  ],
};

beforeEach(() => {
  jest.spyOn(api, "loadData").mockReturnValue(data);
});

  afterEach(() => {
    jest.restoreAllMocks();
  });



describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    await act(async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
    });

    const eventsSection = await screen.getByTestId("events-list");

    expect(await within(eventsSection).findByText("Event 1")).toBeInTheDocument();
    expect(within(eventsSection).getByText("Event 2")).toBeInTheDocument();
    expect(within(eventsSection).getByText("Event 3")).toBeInTheDocument();
  })


  it("a list of people is displayed", async () => {
    await act(async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
    });
    expect(screen.getByTestId("notre-equipe")).toBeInTheDocument();

    const staffList = [
      { name: "Samira", position: "CEO" },
      { name: "Jean-baptiste", position: "CEO" },
      { name: "Alice", position: "Directeur marketing" },
      { name: "Luís", position: "Animateur" },
      { name: "Christine", position: "VP animation" },
      { name: "Isabelle", position: "VP communication" },
    ];
    staffList.forEach(person => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.position)).toBeInTheDocument();
    });
  })


  it("a footer is displayed", async () => {
    await act(async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
    });

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(screen.getByText(/Une agence événementielle/i)).toBeInTheDocument();

    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
  });

});
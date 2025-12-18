import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";


jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({
    error: null,
    last: {
      cover: "/img.png",
      title: "Dernier événement",
      date: "2023-01-01",
    },
    data: {
      events: [
        {
          id: 1,
          cover: "/event1.png",
          title: "Event 1",
          date: "2023-01-01",
          type: "conférence",
        },
        {
          id: 2,
          cover: "/event2.png",
          title: "Event 2",
          date: "2023-02-01",
          type: "soirée",
        },
        {
          id: 3,
          cover: "/event3.png",
          title: "Event 3",
          date: "2023-03-01",
          type: "soirée",
        },
      ],
    },
  }),
}));


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
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


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);

    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
    expect(screen.getByText("Event 3")).toBeInTheDocument();
  })


  it("a list a people is displayed", () => {
    render(<Home />);
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


  it("a footer is displayed", () => {

    render(<Home />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(screen.getByText(/Une agence événementielle/i)).toBeInTheDocument();

    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {


    render(<Home />);
    expect(
      screen.getByText("Dernier événement")
    ).toBeInTheDocument();



  })

});
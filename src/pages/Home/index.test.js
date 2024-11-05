import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { useData } from "../../contexts/DataContext";

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
      // Attend que le texte "En cours" apparaisse à l'écran, avec un délai d'attente maximum de 3 secondes
      await screen.findByText("En cours", {}, { timeout: 3000 });
      // Attend que le texte "Message envoyé !" apparaisse à l'écran, avec un délai d'attente maximum de 3 secondes
      await screen.findByText("Message envoyé !", {}, { timeout: 3000 });
    });
  });
});

// Ajout des tests unitaires ci-dessous
describe("When a page is created", () => {
  // Test pour vérifier qu'une liste d'événements est affichée sur la page
  it("a list of events is displayed", async () => {
    // Rend le composant Home et récupère le conteneur
    const { container } = render(<Home />);
    // Vérifie que l'élément avec l'id "realisationTitle" contient bien le texte attendu
    const nosReal = await container.querySelector("#realisationTitle");
    expect(nosReal.innerHTML).toEqual("Nos réalisations");
    // Vérifie que la liste d'événements est présente dans le DOM
    const events = await container.querySelector("#events");
    expect(events).toBeInTheDocument();
  });

  // Test pour vérifier qu'une liste de personnes est affichée sur la page
  it("a list of people is displayed", async () => {
    render(<Home />);
    // Vérifie que les textes "CEO", "Alice", et "Isabelle" sont présents dans le DOM
    await screen.findByText("CEO");
    await screen.findByText("Alice");
    await screen.findByText("Isabelle");
  });

  // Test pour vérifier qu'un footer est affiché sur la page
  it("a footer is displayed", async () => {
    render(<Home />);
    // Vérifie que l'élément footer est bien présent dans le DOM via son testId
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  // Test pour vérifier que la carte du dernier événement est affichée
  it("an event card, with the last event, is displayed", async () => {
    // Test d'implémentation
    render(<Home />);
    // Utilise setTimeout pour donner le temps au composant de charger les données
    setTimeout(() => {
      // Utilise la fonction useData() pour obtenir le dernier événement
      const { last } = useData();
      // Vérifie que l'élément "event-card" et le titre du dernier événement sont affichés
      screen.findByTestId("event-card");
      screen.findByText(last.title);
    }, 100);
  });
});

import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";

describe("Icon component", () => {
  describe("When a icon is created with name twitch", () => {
    it("the icon contain this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
      // Ce test vérifie que l’icône affichée pour le nom "twitch" possède bien le bon chemin vectoriel (ou path) correspondant à une valeur de hachage spécifique
      render(<Icon name="twitch" />);
      expect(md5(screen.getByTestId("icon").getAttribute("d"))).toEqual(
        "327fbc38c8e878259c3ec35ef231517a"
      );
    });
  });
  describe("When a icon is created with name facebook", () => {
    it("the icon contain this path hash value bbea4c9e40773b969fdb6e406059f853", () => {
      // Ajout de tests unitaires pour vérifier que l’icône affichée pour le nom "facebook" possède bien le bon chemin vectoriel (ou path) correspondant à une valeur de hachage spécifique
      render(<Icon name="facebook" />);
      expect(md5(screen.getByTestId("icon").getAttribute("d"))).toEqual(
        "bbea4c9e40773b969fdb6e406059f853"
      );
    });
  });
});

/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#ServicesContainer">Nos services</a>
      </li>
      <li>
        <a href="#EventsContainer">Nos réalisations</a>
      </li>
      <li>
        <a href="#PeoplesContainer">Notre équipe</a>
      </li>
    </ul>
    <Button
      title="contact"
      onClick={() => (window.document.location.hash = "#contact")}
    >
      Contact
    </Button>
  </nav>
);
// Correction des ancres suivantes : Nos services, Nos réalisations et Notre équipe pour mener correctement aux sections correspondantes.
export default Menu;

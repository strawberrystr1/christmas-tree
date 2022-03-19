import { State } from "../index";
import Cards from "./components/toys-components/cards";
import CreatePage from "./view";

export default class ToysPage {

  init() {
    const mainParent: HTMLElement = document.querySelector('.main-wrapper') as HTMLElement;
    const creater: CreatePage = new CreatePage(mainParent);
    creater.createToysPage('filters-page');
    const parent = document.querySelector('.filters-page') as HTMLElement;
    State.cards.createCards(State.state.filteredData, parent);
    State.cards = new Cards(parent);
  }
}
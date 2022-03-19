import { State } from "../../../index";
import { HTMLBuilder } from "../html-builder";

export default class BackgroundChoose extends HTMLBuilder {
  createBG(parent: HTMLElement, data: string[]) {
    const wrapper = this.createElem({tag: 'div', className: 'tree-settings__bg-choose'});
    const name = this.createElem({tag: 'p', className: 'tree-settings__bg-choose_name name', textContent: 'Выберите фон'});
    const innerWrapper = this.createElem({tag: 'div', className: 'tree-settings__bg'});

    data.forEach(item => {
      const card = this.createElem({tag: 'div', className: 'tree-settings__bg_card'});
      card.style.backgroundImage = `url('./assets/images/bg/${item}.webp')`;

      card.addEventListener('click', () => {
        HTMLBuilder.onBgChange(card.style.backgroundImage);
        State.state.currentTree.bgNumber = +item;
        State.utils.setLocalStorage();
      });

      innerWrapper.append(card);
    });

    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
import { State } from "../../../index";
import { HTMLBuilder } from "../html-builder";

export default class TreeChoose extends HTMLBuilder {
  createTree(imgURLs: string[], parent: HTMLElement) {
    const wrapper = this.createElem({tag: 'div', className: 'tree-settings__tree-choose'});
    const name = this.createElem({tag: 'p', className: 'tree-settings__tree-choose_name name', textContent: 'Выберите ёлку'});
    const innerWrapper = this.createElem({tag: 'div', className: 'tree-settings__trees'});
    
    imgURLs.forEach(item => {
      const card = this.createElem({tag: 'div', className: 'tree-settings__trees_card'});
      card.style.backgroundImage = `url('./assets/images/tree/${item}.webp')`;
      card.addEventListener('click', () => {
        HTMLBuilder.onTreeChange(card.style.backgroundImage);
        State.state.currentTree.treeNumber = +item;
        State.utils.setLocalStorage();
      })

      innerWrapper.append(card);
    });

    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
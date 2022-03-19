import { app, State } from "../../../index";
import { HTMLBuilder } from "../html-builder";

export default class Saved extends HTMLBuilder {
  createSaved(parent: HTMLElement) {
    const wrapper = this.createElem({tag: 'div', className: 'tree-toys__saved'});
    const name = this.createElem({tag: 'p', className: 'tree-settings__lights-choose_name name', textContent: 'Вы нарядили'});
    const innerWrapper = this.createElem({tag: 'div', className: 'tree-settings__trees tree-settings__trees-saved'});

    if (State.state.savedTrees.length > 0) {
      State.state.savedTrees.forEach(item => {
        const card = this.createElem({tag: 'div', className: 'tree-settings__trees_card tree-settings__trees_card-saved'});
        card.style.backgroundImage = `url('./assets/images/tree/${item.tree.treeNumber}.webp')`;

        item.tree.toys.forEach(toy => {
          const img = this.createElem({tag: 'img', className: 'saved-toy'}) as HTMLImageElement;
          img.src = `./assets/images/toys/${toy.toyNumber}.webp`;
          img.style.top = toy.top + '%';
          img.style.left = toy.left - 1 + '%';
          State.utils.addDragEvents(img, img.src);
          card.append(img);
        }); 

        card.addEventListener('click', () => {
          const copiedToys = item.tree.toys.map(item => item);
          State.state.currentTree.toys = copiedToys;
          State.state.currentTree.bgNumber = item.tree.bgNumber;
          State.state.currentTree.treeNumber = item.tree.treeNumber;
          State.state.currentTree.id = item.id;
          app.tree(item.toys);
        });

        innerWrapper.append(card);
      })
    } else {
      const noTreeCard = this.createElem({tag: 'div', className: 'tree-settings__trees_card-no-card', textContent: 'Вы еще не наряжали ёлку'});
      innerWrapper.append(noTreeCard);
    }

    
    
    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
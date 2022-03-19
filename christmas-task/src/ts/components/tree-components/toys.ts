import { HTMLBuilder } from "../html-builder";
import {State} from '../../../index';
import { IDataResponse } from "../../interfaces";

export default class Toys extends HTMLBuilder {
  createToys(parent: HTMLElement, data: IDataResponse[]) {
    const wrapper = this.createElem({tag: 'div', className: 'tree-toys__toys-choose'});
    const name = this.createElem({tag: 'p', className: 'tree-toys__toys-choose_name name', textContent: 'Игрушки'});
    const innerWrapper = this.createElem({tag: 'div', className: 'tree-toys__toys'});
    
    HTMLBuilder.toys = [];

    data.forEach((item) => {
      const card = this.createElem({tag: 'div', className: 'tree-toys__toys_card'});
      const span = this.createElem({tag: 'span', className: 'tree-toys__toys_card_counter', textContent: item.count});
      const img = this.createElem({tag: 'img'}) as HTMLImageElement;
      card.dataset.number = item.num;

      img.draggable = true;
      img.src = `./assets/images/toys/${item.num}.webp`
      img.dataset.number = item.num;

      img.ondragstart = (e) => {
        const id = State.state.currentTree.toys.length + '';
        e.dataTransfer?.setData('href', (e.target as HTMLImageElement).src);
        e.dataTransfer?.setData('id', item.num);
        e.dataTransfer?.setData('idnt', id);
      }

      img.ondragend = (e) => {
        const isAllowed = State.utils.checkPosition(e);

        State.state.currentTree.id = 0;

        if (isAllowed) {
          const count = +(span.textContent as string);
          span.textContent = (count - 1).toString();
          if (count <= 1) {
            img.remove();
          }

          State.state.currentTree.toys.push({
            left: e.pageX * 100 / window.innerWidth - 25*100/window.innerWidth,
            top: e.pageY * 100 / window.innerHeight - 25*100/window.innerHeight,
            toyNumber: +((e.target as HTMLElement).dataset.number as string),
            toyID: State.state.currentTree.toys.length
          });

          State.utils.setLocalStorage();
        }
      }

      card.append(img);
      card.append(span);

      HTMLBuilder.toys.push(card);

      innerWrapper.append(card);
    });

    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
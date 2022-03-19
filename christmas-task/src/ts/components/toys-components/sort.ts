import {State} from '../../../index';
import {HTMLBuilder} from '../html-builder';
import { ICreateParams } from '../../interfaces';

export default class Sort extends HTMLBuilder {

  createSort(options: Partial<ICreateParams>[], parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__sort'});
    const name = this.createElem({tag: 'p', className: 'filters-page__sort_name name', textContent: 'Сортировать'});
    const select = this.createSelect(options);
    select.selectedIndex = State.state.filters.sortIndex ? State.state.filters.sortIndex : 0;
    State.filter.sortData();
    select.addEventListener('change', () => {
      State.state.filters.sortIndex = select.selectedIndex;
      const sorted = State.filter.sortData();
      State.utils.setLocalStorage();
      ((State.cards.parent as Element).lastChild as Element).remove();
      State.cards.createCards(sorted, State.cards.parent as Element)
    })

    wrapper.append(name);
    wrapper.append(select);

    parent.append(wrapper);
  }
}
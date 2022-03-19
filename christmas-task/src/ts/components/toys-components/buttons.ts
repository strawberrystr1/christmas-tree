import { app, State } from '../../../index';
import {HTMLBuilder} from '../html-builder';

export default class Buttons extends HTMLBuilder{
  createFavouriteBtn(parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__favourite'});
    const input = this.createInput('checkbox', {
      value: 'false',
      name: 'favourite',
      textContent: 'Только любимые',
      className: 'filters-page__favourite_checkbox'
    });
    const label = this.createElem({tag: 'label', className: 'filters-page__favourite_label'});
    label.setAttribute('for', 'favourite');
    label.append(input);
    label.append('Только любимые');

    input.addEventListener('change', () => {
      State.state.filters.onlyFavorite = !State.state.filters.onlyFavorite;
      State.filter.callFilter();
    })

    wrapper.append(label);

    parent.append(wrapper);
  }

  createButtons(parent: Element): void {
    const btnWrapper = this.createElem({tag: 'div', className: 'filters-page__buttons-wrap'});
    const resetBtn = this.createElem({tag: 'button', className: 'filters-page__reset', textContent: 'Сбросить фильтры'});
    const resetLSBtn = this.createElem({tag: 'button', className: 'filters-page__reset', textContent: 'Очистить хранилище'});
    
    resetBtn.addEventListener('click', () => {
      State.filter.clearFilters();
      app.toys();
    });

    resetLSBtn.addEventListener('click', () => {
      State.filter.clearStorage();
      app.toys();
    })

    btnWrapper.append(resetBtn);
    btnWrapper.append(resetLSBtn);
    parent.append(btnWrapper);
  }
}
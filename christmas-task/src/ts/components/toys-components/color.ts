import { State } from '../../../index';
import {HTMLBuilder} from '../html-builder';
import { IColor } from '../../interfaces';

export default class Color extends HTMLBuilder{
  createColor(colors: string[], parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__color'});
    const name = this.createElem({tag: 'p', className: 'filters-page__form_name name', textContent: 'Цвет'});
    const innerWrapper = this.createElem({tag: 'div', className: 'filters-page__color_wrapper'});

    colors.forEach((color) => {
      const el = this.createElem({tag: 'div', className: `filters-page__color_color filters-page__color_color-${color}`});
      if (State.state.filters.color[color as keyof IColor]) {
        el.classList.add(`active-${color}`);
      }
      el.addEventListener('click', () => {
        State.state.filters.color[color as keyof IColor] = !State.state.filters.color[color as keyof IColor];
        el.classList.toggle(`active-${color}`);
        el.classList.contains(`active-${color}`) ? 
          State.filter.callFilter() :
          State.filter.callFilter();
        
      })
      innerWrapper.append(el);
    })

    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
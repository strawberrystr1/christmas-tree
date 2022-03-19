import { State } from '../../../index';
import {HTMLBuilder} from '../html-builder';
import { IShape, ICreateParams } from '../../interfaces';

export default class Form extends HTMLBuilder{
  createForm(itemsNames: Partial<ICreateParams>[], parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__form'});
    const name = this.createElem({tag: 'p', className: 'filters-page__form_name name', textContent: 'Форма'});
    const innerWrapper = this.createElem({tag: 'div', className: 'filters-page__form_wrapper'});

    itemsNames.forEach((item) => {
      const formItem = this.createFormItem((item.textContent as string), (item.className as string));
      if (State.state.filters.shape[item.className as keyof IShape]) {
        formItem.classList.add('active-shape');
      }
      formItem.addEventListener('click', () => {
        State.state.filters.shape[item.className as keyof IShape] = !State.state.filters.shape[item.className as keyof IShape];
        formItem.classList.toggle('active-shape');
        formItem.classList.contains('active-shape') ? 
          State.filter.callFilter() : 
          State.filter.callFilter();
      });

      innerWrapper.append(formItem);
    })

    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }

  createFormItem(innerText: string, className: string): HTMLElement {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__form_item'});
    const icon = this.createElem({tag: 'div', className: `filters-page__form_item_icon filters-page__form_item_icon-${className}`});
    const name = this.createElem({tag: 'p', className: 'filters-page__form_name name', textContent: innerText});
    
    wrapper.append(icon);
    wrapper.append(name);

    return wrapper;
  }
}
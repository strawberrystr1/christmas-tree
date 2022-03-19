import { State } from '../../../index';
import {HTMLBuilder} from '../html-builder';
import { ISize, ICreateParams } from '../../interfaces';

export default class Size extends HTMLBuilder{
  createSize(params: Partial<ICreateParams>[], parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__size'});
    const name = this.createElem({tag: 'p', className: 'filters-page__size_name name', textContent: 'Размер'});
    const innerWrapper = this.createElem({tag: 'div', className: 'filters-page__size_wrapper'});

    params.forEach(item => {
      const input = this.createInput('checkbox', {
        value: item.value,
        name: item.value,
        textContent: item.textContent,
        className: 'filters-page__size_checkbox'
      });

      const label = this.createElem({tag: 'label', className: 'filters-page__size_label'});
      label.setAttribute('for', item.value as string);
      label.append(input);
      label.append(item.textContent as string);

      input.addEventListener('change', () => {
        State.state.filters.size[item.value as keyof ISize] = !State.state.filters.size[item.value as keyof ISize]
        State.filter.callFilter();
      });

      innerWrapper.append(label);
    })

    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
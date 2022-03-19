import { State } from "../../../index";
import { HTMLBuilder } from "../html-builder";

export default class Ligths extends HTMLBuilder {
  createLights(parent: HTMLElement, colors: string[]) {
    const wrapper = this.createElem({tag: 'div', className: 'tree-settings__lights-choose'});
    const name = this.createElem({tag: 'p', className: 'tree-settings__lights-choose_name name', textContent: 'Гирлянда'});
    const innerWrapper = this.createElem({tag: 'div', className: 'tree-settings__lights'});
    const ligthsArr: HTMLElement[] = [];

    const label = this.createElem({tag: 'label', className: 'checkbox-green'});
    const checkbox = this.createInput('checkbox', {className: 'checkbox7'}) as HTMLInputElement;
    const span = this.createElem({tag: 'span', className: 'checkbox-green-switch'});
    span.dataset.labelOn = 'Вкл';
    span.dataset.labelOff = 'Выкл';

    colors.forEach((item, i) => {
      const light = this.createElem({tag: 'div', className: `tree-settings__lights_light tree-settings__lights_light-${item}`});
      ligthsArr.push(light);

      light.addEventListener('click', () => {
        if (HTMLBuilder.gerlandDelete) {
          HTMLBuilder.gerlandDelete();
        }
        if (light.classList.contains('active')) {
          HTMLBuilder.gerlandDelete();
          light.classList.remove('active');
          checkbox.checked = false;
        } else {
          ligthsArr.forEach(item => item.classList.remove('active'));
          HTMLBuilder.onGerlandChange(item);
          light.classList.add('active');
          checkbox.checked = true;
          State.state.lastGerland = i;
          State.utils.setLocalStorage();
        }
      });
      
      innerWrapper.append(light);
    });
    
    checkbox.onclick = () => {
      const colors = ['blue', 'yellow', 'red', 'green', 'gradient'];
      if (checkbox.checked) {
        HTMLBuilder.onGerlandChange(colors[State.state.lastGerland]);
        ligthsArr[State.state.lastGerland].classList.add('active');
      } else {
        ligthsArr.forEach(item => item.classList.remove('active'));
        HTMLBuilder.gerlandDelete();
      }
    }

    label.append(checkbox);
    label.append(span);

    innerWrapper.append(label);
    wrapper.append(name);
    wrapper.append(innerWrapper);

    parent.append(wrapper);
  }
}
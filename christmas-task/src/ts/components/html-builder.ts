import { State } from "../../index";
import { ICreateParams } from "../interfaces";
export class HTMLBuilder{
  static onCardChoose: (has: boolean, e: MouseEvent) => boolean;
  onPlay: () => void;
  onPause: () => void;
  static gerlandDelete: () => void;
  static onTreeChange: (url: string) => void;
  static onBgChange: (url: string) => void;
  static onGerlandChange: (color: string) => HTMLElement;
  static toys: HTMLElement[] = [];

  constructor() {
    this.onPlay = () => {return};
    this.onPause = () => {return};
  }

  createElem(params: ICreateParams): HTMLElement {
    const elem = document.createElement(params.tag);
    if (params.className) elem.className = params.className;
    if (params.id) elem.id = params.id;
    if (params.textContent) elem.textContent = params.textContent;
    if (params.href) (elem as HTMLLinkElement).href = params.href;
    if (params.disabled) (elem as HTMLOptionElement).disabled = true;
    if (params.name) (elem as HTMLMapElement).name = params.name;
    return elem;
  }

  createInput(type: string, params: Partial<ICreateParams>): HTMLElement {
    const input = document.createElement('input') as HTMLInputElement;
    input.type = type;
    const classes: string[] = (params.className as string).split(' ');
    input.classList.add(...classes)
    input.placeholder = params.placeholder ? params.placeholder : '';
    input.name = params.name ? params.name : '';
    input.autofocus = params.autofocus ? true : false;
    input.autocomplete = 'no';
    return input;
  }

  createSelect(options: Partial<ICreateParams>[]) {
    const select = this.createElem({tag: 'select', className: 'filters-page__sort_select'}) as HTMLSelectElement;

    options.forEach(opt => {
      const option = this.createElem({tag: 'option', value: opt.value, textContent: opt.textContent, disabled: opt.disabled});
      select.append(option);
    })

    return select;
  }

  createPopup() {
    const wrapper = this.createElem({tag: 'div', className: 'popup', textContent: 'Извините, все слоты заполнены'});
    const closeBtn = this.createElem({tag: 'span', className: 'popup_close'});
    wrapper.append(closeBtn);

    closeBtn.addEventListener('click', () => {
      wrapper.remove();
    })
    return wrapper;
  }

  createAudio() {
    if (!document.querySelector('audio')) {
      const audio = this.createElem({tag: 'audio'}) as HTMLAudioElement;
      audio.src = `assets/audio/audio.mp3`;
      audio.volume = 0.1;
      audio.currentTime = 0;
      document.onclick = ()=> {
        if (State.state.audio) {
          audio.play();
        }
      }
      document.body.append(audio);
    }
  }

  createGerlands(count: number, color: string) {
    const countOfGerlands = count;
    let initialCountOfLights = 2;
    const gerland = this.createElem({tag: 'div', className: 'tree__gerland'});
    let initialSize = 0;
    const initialAngle = 50;

    for (let i = 0; i < countOfGerlands; i++) {
      const list = this.createElem({tag: 'ul', className: 'tree__gerland__rope'});
      initialCountOfLights += 3;
      if (i === 0) {
        initialCountOfLights = 5
      }
      initialSize += 9;
      list.style.width = list.style.height = initialSize + 'vh';

      for (let k = 1; k <= initialCountOfLights; k++) {
        const angle = 360/4.5/initialCountOfLights;
        const li = this.createElem({tag: 'li', className: `tree__gerland__rope_item ${color}`});
        li.style.transform = `rotate(${initialAngle + (angle * k)}deg) translate(${(initialSize - 2) / 2}vh)`;
        list.append(li);
      }

      gerland.append(list);
    }

    return gerland;

  }
}


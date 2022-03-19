import Header from "./components/header";
import { HTMLBuilder } from "./components/html-builder";

export default class Main extends HTMLBuilder {
  createMain() {
    
    const header = new Header();
    header.createHeader(document.querySelector('.header-wrapper') as HTMLElement, false, 'main');
    
    const mainParent: HTMLElement = document.querySelector('.main-wrapper') as HTMLElement;
    mainParent.innerHTML = '';

    document.body.className = 'main-bg';
    const main = this.createElem({tag: 'div', className: 'main__content'});
    const name = this.createElem({tag: 'p', className: 'main__content_name', textContent: 'Помогите бабушке нарядить елку'});
    const btn = this.createElem({tag: 'a', className: 'main__content_button', textContent: 'Начать', href: '#toys'});
    
    main.append(name);
    main.append(btn);

    mainParent.append(main);
  }
}
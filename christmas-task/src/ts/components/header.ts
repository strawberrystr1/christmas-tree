import {HTMLBuilder} from './html-builder';
import {santa, State} from '../../index';

export default class Header extends HTMLBuilder {
  onCreatePopup: (e: MouseEvent) => void = () => {return};

  createHeader(parent: Element, search: boolean, type: string) {
    parent.innerHTML = '';

    const navBlock = this.createElem({tag: 'div', className: 'header__nav-block'});
    const mainLink = this.createElem({tag: 'a', className: `header__nav-block_logo ${type}-link`, href: '#main'});
    const toysLink = this.createElem({tag: 'a', className: `header__nav-block_toys ${type}-link`, href: '#toys', textContent: 'игрушки'});
    const treeLink = this.createElem({tag: 'a', className: `header__nav-block_tree ${type}-link`, href: '#tree', textContent: 'ёлки'});

    

    navBlock.append(mainLink);
    navBlock.append(toysLink);
    navBlock.append(treeLink);

    parent.append(navBlock);

    if (search) {
      const favBlock = this.createElem({tag: 'div', className: 'header__fav-block'});
      const searchBlock = this.createElem({tag: 'div', className: 'header__fav-block__search'});
      const search = this.createInput('search', {className: 'header__fav-block__search_search', placeholder: 'Поиск', autofocus: true});

      searchBlock.append(search);

      const counterBlock = this.createElem({tag: 'div', className: 'header__fav-block_counter'});
      const counter = this.createElem({tag: 'span', className: 'header__fav-block_counter-counter', textContent: '0'});
      
      if (State.state.filters.favourite.length) {
        counter.textContent = State.state.filters.favourite.length.toString();
      }

      search.addEventListener('input', () => {
        State.filter.search((search as HTMLInputElement).value);
      });

      this.onCreatePopup = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        const popup = this.createPopup()

        if ((document.body.lastElementChild as HTMLElement).classList.contains('popup')) return;
        document.body.append(popup);
        
        popup.style.left = (x - 55).toString() + 'px';
        popup.style.top = (y + 20).toString() + 'px';

        setTimeout(() => {
          popup.classList.add('active')
        }, 100)
        setTimeout(() => {
          popup.remove();
        }, 2000)
      }
    
      HTMLBuilder.onCardChoose = (has: boolean, e: MouseEvent) => {
        const current = Number.parseFloat(counter.textContent as string);
        if (!has) {
          counter.textContent = (current - 1).toString();
        } else {
          if (current >= 20) {
            this.onCreatePopup(e);
            return true;
          }
          counter.textContent = (current + 1).toString();
        }
        return false;
      }

      const santaBtn = this.createElem({
        tag: "div",
        className: "santa-button",
      });
      const tip = this.createElem({
        tag: "div",
        className: "santa-button-popup-tip santa-button-popup",
        textContent: "Кликни по мне и попробуй поймай меня",
      });
      const rules = this.createElem({
        tag: "div",
        className: "santa-button-popup-rules santa-button-popup",
        textContent: "Поймай меня 5 раз, но помни что я шустрый",
      });

      santaBtn.addEventListener("click", () => {
        if (!santaBtn.classList.contains("active")) {
          santaBtn.classList.add("active");
          const coords = santaBtn.getBoundingClientRect();
          rules.style.left = coords.left - 190 + "px";
          rules.style.top = coords.top + 5 + "px";
          document.body.append(rules);
        } else {
          santaBtn.classList.remove("active");
          (
            document.querySelector(".santa-button-popup-rules") as HTMLElement
          ).remove();
        }
        State.state.santaGame = !State.state.santaGame;
        State.utils.setLocalStorage();
        santa.playGame();
      });

      santaBtn.addEventListener("mouseover", () => {
        const coords = santaBtn.getBoundingClientRect();
        tip.style.left = coords.left + 60 + "px";
        tip.style.top = coords.top + 5 + "px";
        document.body.append(tip);
      });

      santaBtn.addEventListener("mouseleave", () => {
        tip.remove();
      });

      counterBlock.append(counter);

      favBlock.append(searchBlock);
      favBlock.append(counterBlock);

      parent.append(santaBtn);
      parent.append(favBlock);
    }
  }
}
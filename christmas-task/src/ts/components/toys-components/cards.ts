import { State } from '../../../index';
import { HTMLBuilder } from '../html-builder';
import { IDataResponse } from '../../interfaces';
export default class Cards extends HTMLBuilder{
  parent: Element | null;
  cardsSet: HTMLElement[];

  constructor(parent: Element | null) {
    super();
    this.parent = parent;
    this.cardsSet = [];
  }

  createCards(data: IDataResponse[], parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__cards'});
    const animClasses = ['trans1', 'trans2', 'trans3', 'trans4'];

    State.state.data.forEach((item, i) => {
      const innerWrapper = this.createElem({tag: 'div', className: 'filters-page__card'});
      const cardName = this.createElem({tag: 'p', className: 'filters-page__card_name name', textContent: item.name});
      const cardAmount = this.createElem({tag: 'p', className: 'filters-page__card_amount filters-page__card_item', textContent: `Количество: ${item.count}`});
      const cardYear = this.createElem({tag: 'p', className: 'filters-page__card_year filters-page__card_item', textContent: `Год покупки: ${item.year}`});
      const cardForm = this.createElem({tag: 'p', className: 'filters-page__card_form filters-page__card_item', textContent: `Форма игрушки: ${item.shape}`});
      const cardColor = this.createElem({tag: 'p', className: 'filters-page__card_color filters-page__card_item', textContent: `Цвет игрушки: ${item.color}`});
      const cardSize = this.createElem({tag: 'p', className: 'filters-page__card_size filters-page__card_item', textContent: `Размер игрушки: ${item.size}`});
      const cardFavourite = this.createElem({tag: 'p', className: 'filters-page__card_favourite filters-page__card_item', textContent: `Любимая: ${item.favorite ? 'Да' : 'Нет'}`});
      const image = this.createElem({tag: 'div', className: 'filters-page__card_image'});
      image.style.backgroundImage = `url('./assets/images/toys/${item.num}.webp')`;

      innerWrapper.append(cardName);
      innerWrapper.append(image);
      innerWrapper.append(cardAmount);
      innerWrapper.append(cardYear);
      innerWrapper.append(cardForm);
      innerWrapper.append(cardColor);
      innerWrapper.append(cardSize);
      innerWrapper.append(cardFavourite);

      if (State.state.filters.favourite.includes(+item.num)) innerWrapper.classList.add('favourite-card');

      innerWrapper.addEventListener('click', (e: MouseEvent) => {
        if (!innerWrapper.classList.contains('favourite-card')) {
          const isFull = HTMLBuilder.onCardChoose(true, e);
          if (isFull) {
            return;
          }
          innerWrapper.classList.add('favourite-card');
          if (!State.state.filters.favourite.includes(+item.num)) {
            State.state.filters.favourite.push(+item.num);
          }
        } else {
          HTMLBuilder.onCardChoose(false, e);
          innerWrapper.classList.remove('favourite-card');
          const ind = State.state.filters.favourite.findIndex(elem => elem === +item.num);
          State.state.filters.favourite.splice(ind, 1);
        }
        
        State.utils.setLocalStorage();
      });

      State.state.data[i].onHide = (): HTMLElement => {
        return innerWrapper;
      };

      State.state.data[i].forHide = (item: IDataResponse) => {
        if (!State.state.filteredData.includes(item)) {
          return innerWrapper;
        } 
      };

      const ind = State.state.filteredData.findIndex(elem => elem.num === item.num);
      if (ind === -1) {
        innerWrapper.classList.add('hide', 'dn');
      } else {
        State.state.filteredData[ind] = item; 
      }

      wrapper.append(innerWrapper);
      this.cardsSet.push(innerWrapper);
      innerWrapper.style.order = i.toString();

      const rnd = Math.floor(Math.random() * 4);
      innerWrapper.classList.add(animClasses[rnd]);
    });

    if (data) {
      State.state.filteredData.forEach((el,i) => {
        el.onHide().style.order = (100 * i).toString();
      })
    }
    
    const noFilterDiv = this.createElem({tag: 'div', className: 'no-filters hide dn', textContent: 'Извините, совпадений не обнаружено'});
    noFilterDiv.style.order = (State.state.data.length * 100).toString();
    wrapper.append(noFilterDiv);
    parent.append(wrapper);
    parent.append(wrapper);

    
    setTimeout(() => {
      State.state.data.forEach(item => {
        const elem = item.onHide();
        elem.classList.add('antitrans');
      })
    }, 100)
  }

  destroy() {
    ((this.parent as Element).lastChild as HTMLElement).remove();
  }
}
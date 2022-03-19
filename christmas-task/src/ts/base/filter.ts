import Utils from './utils';
import {IDataResponse, IShape, IColor} from '../interfaces';
import { State } from '../../index';
import {Shapes, Colors, Sizes} from '../enums'

export default class Filter {
  utils: Utils;

  constructor(utils: Utils) {
    this.utils = utils;
  }

  callFilter() {
    this.uniqueFilter();
    this.utils.setLocalStorage();
  }

  checkCurrentData() {
    return State.state.filteredData.length ? State.state.filteredData : State.state.data
  }

  uniqueFilter() {
    const noFilterDiv = document.querySelector('.no-filters') as HTMLElement;
    noFilterDiv.classList.add('hide', 'dn');

    let filtered: IDataResponse[] = [];
    let woShape = true;
    const dataAfterShape: IDataResponse[] = [];
    this.showCard();

    Object.values(State.state.filters.shape).forEach((item: IShape, i) => {
      let sortedByShape: IDataResponse[];
      if (item) {
        sortedByShape = State.state.data.filter(item => item.shape === Shapes[i])
          .filter(item => +item.count >= State.state.filters.amount.start && +item.count <= State.state.filters.amount.end)
          .filter(item => +item.year >= State.state.filters.year.start && +item.year <= State.state.filters.year.end);  
        woShape = false;
        dataAfterShape.push(...sortedByShape);
      }
    })

    if (!Object.values(State.state.filters.shape).every(item => !item)) {
      filtered = dataAfterShape;
    }

    if (woShape) {
      filtered = State.state.data.filter(item => +item.count >= State.state.filters.amount.start && +item.count <= State.state.filters.amount.end)
        .filter(item => +item.year >= State.state.filters.year.start && +item.year <= State.state.filters.year.end);
    }

    const dataAfterColor: IDataResponse[] = [];
    Object.values(State.state.filters.color).forEach((item: IColor, i) => {
      if (item) {
        const tempData = filtered.filter(item => item.color === Colors[i])
        dataAfterColor.push(...tempData)
      } 
    })

    if (!Object.values(State.state.filters.color).every(item => !item)) {
      filtered = dataAfterColor;
    }

    const dataAfterSize: IDataResponse[] = [];
    Object.values(State.state.filters.size).forEach((item, i) => {
      if (item) {
        const tempSizeSorted = filtered.filter(item => item.size === Sizes[i])
        dataAfterSize.push(...tempSizeSorted);
      }
    })

    if (!Object.values(State.state.filters.size).every(item => !item)) {
      filtered = dataAfterSize;
    }

    if (State.state.filters.onlyFavorite) {
      filtered = filtered.filter(item => item.favorite)
    }
    
    State.state.filteredData = filtered;

    const sorted = this.sortData();
    
    State.state.data.forEach((el) => {
      el.onHide().style.order = 0..toString();
    })

    State.state.filteredData.forEach((el) => {
      el.onHide().style.order = 0..toString();
    })

    sorted.forEach((el, i) => {
      el.onHide().style.order = (100 * i).toString();
    })

    this.update();

    if (!filtered.length) {
      noFilterDiv.classList.remove('hide', 'dn');
    }
  }

  showCard() {
    const allData = State.state.data.map(item => {
      return item.onHide(+item.num);
    })
    allData.forEach(item => {
      item.classList.remove('hide', 'dn')
    });
  }

  update() {

    const itemsToHide = State.state.data.map(item => {
      return item.forHide(item);
    }).filter(item => item);

    function animate(index: number) {
      const elem = itemsToHide[index];
      if (!elem) {
        return;
      }
      elem.onanimationend = () => {
        elem.classList.add('dn');
        animate(index + 1);
      }
      elem.classList.add('hide');
    }

    animate(0);
  }

  clearFilters() {
    this.utils.clearFilters();
    State.cards.destroy();
    State.cards.createCards(State.state.data, State.cards.parent as Element);
  }

  clearStorage() {
    this.utils.clearStorage();
    State.cards.destroy();
    State.cards.createCards(State.state.data, State.cards.parent as Element);
  }

  search(value: string) {
    (document.querySelector('.no-filters') as HTMLElement).classList.add('hide', 'dn');
    const matches: IDataResponse[] = [];
    State.state.filteredData.forEach(item => {
      if (item.name.toUpperCase().includes(value.toUpperCase())) {
        matches.push(item);
      } 
    })

    if (!matches.length) {
      State.state.filteredData.forEach(item => {
        const htmlElem = item.onHide();
        htmlElem.classList.add('hide', 'dn');
        (document.querySelector('.no-filters') as HTMLElement).classList.remove('hide', 'dn');
      });
      return;
    }

    State.state.filteredData.forEach(elem => {
      const htmlElem = elem.onHide();
      if (!matches.includes(elem)) {
        htmlElem.classList.add('hide', 'dn');
      } else {
        htmlElem.classList.remove('hide', 'dn');
      }
    })
    
  }

  sortData() {
    const data = this.checkCurrentData();
    
    let sorted = data;
    switch(State.state.filters.sortIndex) {
      case 0: {
        break;
      }
      case 1: {
        sorted = data.sort((a,b) => a.name.localeCompare(b.name))
        break;
      }
      case 2: {
        sorted = data.sort((a,b) => a.name.localeCompare(b.name)).reverse();
        break;
      }
      case 3: {
        sorted = data.sort((a,b) => +b.year - +a.year)
        break;
      }
      case 4: {
        sorted = data.sort((a,b) => +a.year - +b.year)
        break;
      }
    }
    return sorted;
  }
}
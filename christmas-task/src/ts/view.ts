
import {HTMLBuilder} from './components/html-builder';
import Sort from './components/toys-components/sort';
import Form from './components/toys-components/form';
import Sliders from './components/toys-components/sliders';
import Colors from './components/toys-components/color';
import Size from './components/toys-components/size';
import Buttons from './components/toys-components/buttons';
import Header from './components/header';
import * as constants from './constants';

export default class CreatePage extends HTMLBuilder {
  parent: HTMLElement;
  sort: Sort;
  form: Form;
  sliders: Sliders;
  colors: Colors;
  size: Size;
  buttons: Buttons;
  header: Header;

  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
    this.sort = new Sort();
    this.form = new Form();
    this.sliders = new Sliders();
    this.colors = new Colors();
    this.size = new Size();
    this.buttons = new Buttons();
    this.header = new Header();
  }
  createToysPage(page: string) {
    const headerWrapper = document.querySelector('.header-wrapper') as HTMLElement;
    this.parent.innerHTML = '';
    headerWrapper.innerHTML = '';
    document.body.className = 'filters';
    this.header.createHeader(headerWrapper, true, 'toys');
    const mainWrapper = this.createElem({tag: 'div', className: page});
    const innerWrapper = this.createElem({tag: 'div', className: 'filters-page__filters'});
    

    this.sort.createSort(constants.optionsForSelect,innerWrapper);
    this.form.createForm(constants.formItemNames, innerWrapper);
    this.sliders.createSliders(constants.sliderParams, innerWrapper);
    this.colors.createColor(constants.colors, innerWrapper);
    this.size.createSize(constants.sizeParams, innerWrapper);
    this.buttons.createFavouriteBtn(innerWrapper);
    this.buttons.createButtons(innerWrapper);
    mainWrapper.append(innerWrapper);
    this.parent.append(mainWrapper);
  }

  destroy() {
    (document.querySelector('.filters-page') as HTMLElement).innerHTML = '';
  } 
}
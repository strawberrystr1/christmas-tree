import { HTMLBuilder } from "./components/html-builder";
import TreeChoose from "./components/tree-components/tree-choose";
import ActionBtns from "./components/tree-components/act-btns";
import BackgroundChoose from './components/tree-components/bg';
import Lights from './components/tree-components/lights';
import MainTree from './components/tree-components/main-tree';
import Toys from './components/tree-components/toys'; 
import Saved from './components/tree-components/saved-tree'; 
import Header from "./components/header";
import { State } from "../index";
import { IDataResponse } from "./interfaces";
import * as constants from './constants';

export default class CreateTreePage extends HTMLBuilder{
  treeChoose: TreeChoose;
  actionBtns: ActionBtns;
  parent: HTMLElement;
  bgChoose: BackgroundChoose;
  lights: Lights;
  mainTree: MainTree;
  toys: Toys;
  saved: Saved;

  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
    this.treeChoose = new TreeChoose();
    this.actionBtns = new ActionBtns();
    this.bgChoose = new BackgroundChoose();
    this.lights = new Lights();
    this.mainTree = new MainTree();
    this.toys = new Toys();
    this.saved = new Saved();
  }

  createPage(page: string, data: IDataResponse[]) {
    document.body.className = 'filters';
    const header = new Header();
    header.createHeader(document.querySelector('.header-wrapper') as HTMLElement, false, 'tree');
    
    this.parent.innerHTML = '';

    const mainWrapper = this.createElem({tag: 'div', className: page});
    const settingsWrapper = this.createElem({tag: 'div', className: 'tree-settings'});
    const mainTreeWrapper = this.createElem({tag: 'div', className: 'tree'});
    const treeToysWrapper = this.createElem({tag: 'div', className: 'tree-toys'});

    const parent = document.querySelector('.main-wrapper') as HTMLElement;
    parent.append(mainWrapper);

    mainTreeWrapper.style.backgroundImage = `url('./assets/images/bg/1.webp')`;
    if (State.state.currentTree.bgNumber !== 0) {
      mainTreeWrapper.style.backgroundImage = `url('./assets/images/bg/${State.state.currentTree.bgNumber}.webp')`;
    }

    HTMLBuilder.onBgChange = (url) => {
      mainTreeWrapper.style.backgroundImage = url;
    }

    this.actionBtns.createButtons(settingsWrapper);
    this.treeChoose.createTree(constants.treeImages, settingsWrapper);
    this.bgChoose.createBG(settingsWrapper,constants.bgImages);
    this.lights.createLights(settingsWrapper, constants.lightsColor);
    this.actionBtns.createSaveBtn(settingsWrapper);
    mainWrapper.append(settingsWrapper);

    this.toys.createToys(treeToysWrapper, data);
    this.saved.createSaved(treeToysWrapper);
    mainWrapper.append(mainTreeWrapper);

    this.mainTree.createMainTree(mainTreeWrapper);
    this.createAudio();
    mainWrapper.append(treeToysWrapper);
  }

}
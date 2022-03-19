import { IDataResponse, IToyPosInfo} from "../interfaces";
import { State } from "../../index";
import Cards from "../components/toys-components/cards";
import {ISavedTrees} from '../interfaces';
import { HTMLBuilder } from "../components/html-builder";
import { PartOfTreeRound, PartOfTreeWidth } from "../enums";
export default class Utils {
  private url: string;
  snowfallStop: () => void;

  constructor(url: string) {
    this.url = url;
    this.snowfallStop = () => {return};
  }

  async dataLoader() {
    const response = await fetch(this.url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const data: IDataResponse[] = await response.json();
    return data;
  }

  setLocalStorage() {
    localStorage.setItem('state-strawberry', JSON.stringify(State.state));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('state-strawberry') as string)
  }

  initLocalStorage() {
    State.state.filteredData = State.state.data;
    State.state.filters.amount = {
      start: 1,
      end: 12,
    };
    State.state.filters.year = {
      start: 1940,
      end: 2021,
    };
    State.state.filters.shape = {
      bell: false,
      sphere: false,
      cone: false,
      snowflake: false,
      figure: false,
    };
    State.state.filters.color = {
      white: false,
      yellow: false,
      red: false,
      blue: false,
      green: false,
    };
    State.state.filters.size = {
      big: false,
      medium: false,
      small: false,
    };
    const index = State.state.filters.sortIndex
    State.state.filters.sortIndex = index;
    const favorites = State.state.filters.favourite
    State.state.filters.favourite = favorites;
  }

  clearFilters() {
    this.initLocalStorage();
    this.setLocalStorage();
  }

  clearStorage() {
    this.initLocalStorage();
    State.state.filters.sortIndex = 0;
    State.state.filters.favourite = [];
    this.setLocalStorage();
  }

  removeStorage() {
    State.state.audio = false;
    State.state.lastGerland = 4;
    State.state.currentTree = {
      toys: [],
      treeNumber: 1,
      bgNumber: 1,
    };
    State.state.savedTrees = [];
    this.setLocalStorage();
    this.toggleSnowfall(false);
  }

  createSnowflakes() {
    const snowflakeOffset = 20;
    const snowflakeSize = 10;
    const snowflakeSpeed = 3;
    const parent = (document.querySelector('.tree') as HTMLElement);
    const parentCoords = parent.getBoundingClientRect();
    const snowflake = document.createElement('span');
    snowflake.classList.add('snowflake');
    snowflake.style.left = (parentCoords.left) + Math.random() * (parentCoords.width - snowflakeOffset) + 'px';
    snowflake.style.animationDuration = Math.random() * snowflakeSpeed + snowflakeSpeed + 's';
    snowflake.style.opacity = Math.random() + '';
    snowflake.style.width = snowflake.style.height = Math.random() * snowflakeSize + snowflakeSize + 'px';
    
    parent.append(snowflake);
    
    setTimeout(() => {
      snowflake.remove();
    }, 3500)
  }

  startSnowfall() {
    const timer = window.setInterval(() => {
      this.createSnowflakes();
    },50);
    this.snowfallStop = () => {
      window.clearInterval(timer);
    }
  }

  toggleSnowfall(isFalling: boolean) {
    if(isFalling) {
      this.startSnowfall();
    } else {
      this.snowfallStop();
    }
  }

  initData() {
    let parent: HTMLElement;
    if (State.utils.getLocalStorage()) {
      State.state = State.utils.getLocalStorage();
      parent = document.querySelector('.filters-page') as HTMLElement;
      State.cards = new Cards(parent);
      State.state.santaGame = false;
    } else {
      State.utils.dataLoader().then(res => {
        localStorage.clear();
        State.state.data = res;
        State.state.filteredData = res;
        State.utils.setLocalStorage();
        parent = document.querySelector('.filters-page') as HTMLElement;
        State.cards = new Cards(parent);
      })
    }
  }

  checkPosition(e: MouseEvent) {
    const area = (document.querySelector('area') as HTMLElement);
    const tree = (document.querySelector('.tree__tree_img') as HTMLElement);
    
    const areaCoords = area.getBoundingClientRect();
    const treeCoords = tree.getBoundingClientRect();

    let isAllowed = false;

    const half = 2;
    const coordinatesOffset = 30;

    if (e.clientY > areaCoords.y - treeCoords.height * PartOfTreeRound.firstPart) {
      if (e.clientX > treeCoords.x + treeCoords.width / half * PartOfTreeWidth.firstPart && e.clientX < areaCoords.x - treeCoords.width / half * PartOfTreeWidth.firstPart) {
        isAllowed = true;
      }
    } else if (e.clientY > areaCoords.y - treeCoords.height * PartOfTreeRound.secondPart) {
      if (e.clientX > treeCoords.x + treeCoords.width / half * PartOfTreeWidth.secondPart && e.clientX < areaCoords.x - treeCoords.width / half * PartOfTreeWidth.secondPart) {
        isAllowed = true;
      }
    } else if (e.clientY > areaCoords.y - treeCoords.height * PartOfTreeRound.thirdPart) {
      if (e.clientX > treeCoords.x + treeCoords.width / half * PartOfTreeWidth.thirdPart && e.clientX < areaCoords.x - treeCoords.width / half * PartOfTreeWidth.thirdPart) {
        isAllowed = true;
      }
    } else if (e.clientY > areaCoords.y - treeCoords.height * PartOfTreeRound.fourthPart) {
      if (e.clientX > treeCoords.x + treeCoords.width / half * PartOfTreeWidth.fourthPart && e.clientX < areaCoords.x - treeCoords.width / half * PartOfTreeWidth.fourthPart) {
        isAllowed = true;
      }
    } else {
      if (e.clientX > treeCoords.x + treeCoords.width / half * PartOfTreeWidth.fifthPart && e.clientX < areaCoords.x - treeCoords.width / half * PartOfTreeWidth.fifthPart) {
        isAllowed = true;
      }
    }

    if (e.clientY > areaCoords.y - coordinatesOffset || e.clientY < treeCoords.y) {
      isAllowed = false;
    }

    return isAllowed;
  }

  deleteToy(e: MouseEvent) {
    const elemToDelete = (e.target as HTMLElement).dataset.id as string;

    const ind = State.state.currentTree.toys.findIndex(item => item.toyID === +elemToDelete);

    State.state.currentTree.toys.splice(ind, 1);
    State.utils.setLocalStorage();
  }

  checkFavouriteToys() {
    let data: IDataResponse[] = [];
    const maxCountOfToys = 20;
         
    if (State.state.filters.favourite.length > 0) {
      State.state.data.forEach(item => {
        if (State.state.filters.favourite.includes(+item.num)) {
          data.push(item);
        }
      });
    } else {
      data = State.state.data.slice(0,maxCountOfToys);
    }

    return data;
  }

  saveTree() {
    const copyState = JSON.parse(JSON.stringify(State.state.currentTree));
    const treeToSave: ISavedTrees = {
      tree: copyState,
      toys: [],
      id: State.state.savedTrees.length + 1,
    }

    const toysToSave = this.checkFavouriteToys().slice();
    const toysOnTree = treeToSave.tree.toys.sort((a,b) => a.toyNumber - b.toyNumber);

    const copiedToys = toysToSave.map(toy => {
      const newToy = Object.assign({} ,toy);
      return newToy;
    })

    const toySpices: {[key: number]: number} = {};

    toysOnTree.forEach(item => {
      if (toySpices[item.toyNumber] > 0) {
        toySpices[item.toyNumber] += 1;
      } else {
        toySpices[item.toyNumber] = 1
      }
    });

    toysOnTree.forEach(toy => {
      const toyInStorage = copiedToys.findIndex(item => +item.num === toy.toyNumber);
      const countOfToys = toySpices[toy.toyNumber];
      const toyCount = +copiedToys[toyInStorage].count;
      copiedToys[toyInStorage].count = toyCount - countOfToys + '';
      toySpices[toy.toyNumber] = 0;
    });

    treeToSave.toys = toysToSave.slice();

    State.state.savedTrees.push(treeToSave);
    State.state.currentTree = {
      toys: [],
      treeNumber: 1,
      bgNumber: 1
    }
    State.utils.setLocalStorage();
  }

  checkToy(toy: IToyPosInfo) {
    if (State.state.filters.favourite.length > 0) {
      if(!State.state.filters.favourite.includes(toy.toyNumber)) {
        State.state.currentTree.toys = State.state.currentTree.toys.map((elem) => {
          if (elem.toyNumber !== toy.toyNumber) {
            return elem;
          }
        }).filter(item => item) as IToyPosInfo[];

        State.utils.setLocalStorage();
        return false;
      }
    }
    return true;
  }

  addDragEvents(item: HTMLImageElement, href: string) {
    const builder = new HTMLBuilder();

    item.ondragstart = e => {
      State.utils.deleteToy(e);
      const id = ((e.target as HTMLElement).dataset.id as string);
      const toyNumber = ((e.target as HTMLElement).dataset.number as string);

      e.dataTransfer?.setData('href', (e.target as HTMLImageElement).src);
      e.dataTransfer?.setData('idnt', id);
      e.dataTransfer?.setData('id', toyNumber);
    }

    item.ondragend = e => {
      const dataNumber = +((e.target as HTMLElement).dataset.number as string);
      const toyIndex = HTMLBuilder.toys.findIndex(item => +(item.dataset.number as string) === dataNumber);
      const toysCounter = (HTMLBuilder.toys[toyIndex].lastChild as HTMLElement);
      const isAllowed = State.utils.checkPosition(e);
      
      State.state.currentTree.id = 0;
      State.utils.setLocalStorage();

      if (!isAllowed) {
        toysCounter.textContent = +(toysCounter.textContent as string) + 1 + '';
        State.utils.deleteToy(e);
      }
      
      if (+(toysCounter.textContent as string) === 1 && !isAllowed) {
        State.utils.deleteToy(e);
        const id = (e.target as HTMLElement).dataset.id as string;
        const img = builder.createElem({tag: 'img'}) as HTMLImageElement;
        img.src = href;
        img.dataset.number = toyIndex.toString();
        HTMLBuilder.toys[toyIndex].prepend(img);

        img.ondragstart = (e) => {
          e.dataTransfer?.setData('href', href);
          e.dataTransfer?.setData('idnt', id);
        }

        img.ondragend = (e) => {
          
          const isAllowed = State.utils.checkPosition(e);
          State.state.currentTree.id = 0;
          State.utils.setLocalStorage();
  
          if (isAllowed) {
            const count = +(toysCounter.textContent as string);
            toysCounter.textContent = (count - 1).toString();
            if (count <= 1) {
              img.remove();
            }
          }
        }
      }
      
      if (isAllowed) {
        const percentage = 100;
        const percentageMultiplier = 25;

        State.state.currentTree.toys.push({
          left: e.pageX * percentage / window.innerWidth - percentageMultiplier*percentage/window.innerWidth,
          top: e.pageY * percentage / window.innerHeight - percentageMultiplier*percentage/window.innerHeight,
          toyNumber: toyIndex + 1,
          toyID: (+((e.target as HTMLElement).dataset.id as string))
        });

        State.state.currentTree.id = 0;
        State.utils.setLocalStorage();
      }
      
      e.preventDefault();
      (e.dataTransfer as DataTransfer).dropEffect = 'copy';
      item.remove()
    }
  }
}
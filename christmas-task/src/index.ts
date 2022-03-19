import './styles/main.scss';
import Filter from './ts/base/filter';
import Cards from './ts/components/toys-components/cards';
import {IGameState} from './ts/interfaces';
import Utils from './ts/base/utils';
import Application from './ts/application';
import Santa from './ts/base/santa';

class State {
  static state: IGameState = {
    data: [],
    filteredData: [],
    santaGame: false,
    filters: {
      year: {
        start: 1940,
        end: 2021,
      },
      amount: {
        start: 1,
        end: 12,
      },
      shape: {
        bell: false,
        sphere: false,
        cone: false,
        snowflake: false,
        figure: false,
      },
      color: {
        white: false,
        yellow: false,
        red: false,
        blue: false,
        green: false,
      },
      size: {
        big: false,
        medium: false,
        small: false,
      },
      favourite: [],
      sortIndex: 0,
      onlyFavorite: false,
    },
    audio: false,
    lastGerland: 4,
    currentTree: {
      toys: [],
      treeNumber: 1,
      bgNumber: 1,
    },
    savedTrees: []
  };

  static utils: Utils = new Utils('data.json');
  static filter: Filter = new Filter(State.utils);
  static cards: Cards = new Cards(null);
}

State.utils.initData();

const app = new Application();

const santa = new Santa();

window.addEventListener('hashchange', () => {
  if (window.location.hash.slice(1) === 'main') {
    app.main();
  } else if (window.location.hash.slice(1) === 'toys') {
    app.toys();
  } else {
    app.tree(State.utils.checkFavouriteToys());
  }
})

window.onload = () => {
  window.location.hash = '#main';
  app.main();
}

export {State, app, santa}
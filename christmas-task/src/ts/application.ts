import ToysPage from '../ts/toys-page';
import TreePage from '../ts/tree-page';
import Main from '../ts/main-view';
import { IDataResponse } from './interfaces';
export default class Application {
  toys() {
    const toysPage = new ToysPage();
    toysPage.init();
  }

  tree(data: IDataResponse[]) {
    const treePage = new TreePage();
    treePage.init(data);
  }

  main() {
    const main = new Main();
    main.createMain();
  }
}
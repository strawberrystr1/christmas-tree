import { IDataResponse } from "./interfaces";
import CreateTreePage from "./tree-view";

export default class TreePage {

  init(data: IDataResponse[]) {
    const mainParent = document.querySelector('.main-wrapper') as HTMLElement;
    const creater = new CreateTreePage(mainParent);
    creater.createPage('tree-wrapper', data);
  }
}
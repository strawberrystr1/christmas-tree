import { State } from "../../../index";
import { HTMLBuilder } from "../html-builder";

export default class MainTree extends HTMLBuilder {
  createMainTree(parent: HTMLElement) {
    const wrapper = this.createElem({tag: 'div', className: 'tree__tree'});
    
    const img = this.createElem({tag: 'img', className: 'tree__tree_img'}) as HTMLImageElement;
    img.alt = 'christmas tree';
    img.useMap = '#tree';
    img.src = './assets/images/tree/1.webp';
    if (State.state.currentTree.treeNumber !== 0) {
      img.src = `./assets/images/tree/${State.state.currentTree.treeNumber}.webp`;
    }
    img.draggable = false;

    const map = this.createElem({tag: 'map', id: 'tree', name: 'tree'});
    map.innerHTML = `
    <area coords="0,635,120,683,149,682,368,689,478,647,491,568,397,331,307,93,251,0,177,128,113,293,34,480"  shape="poly">
    `;

    const area = (map.querySelector('area') as HTMLElement);


    if (State.state.currentTree.toys.length > 0) {
      State.state.currentTree.toys.forEach(toy => {
        if (State.utils.checkToy(toy)) {
          const item = this.createElem({tag: 'img'}) as HTMLImageElement;
          item.src = `./assets/images/toys/${toy.toyNumber}.webp`;
          item.dataset.number = toy.toyNumber + '';
          item.dataset.id = toy.toyID + '';
          item.classList.add('draggable');
          item.style.top = toy.top + '%';
          item.style.left = toy.left + '%';
          area.append(item);

          HTMLBuilder.toys.forEach(item => {
            const img = item.querySelector('img');
            const imgNumber = +(img?.dataset.number as string);
            if (toy.toyNumber === imgNumber) {
              const span = item.querySelector('span') as HTMLElement;
              span.textContent = +(span.textContent as string) - 1 + ''
              if (+span.textContent === 0) img?.remove();
            }
          })

          State.utils.addDragEvents(item, item.src);
        }
      });
    }

    area.ondragover = (e) => {
      e.preventDefault();
      if ((e.target as HTMLAreaElement).nodeName !== 'AREA') return;
    }

    area.ondrop = (e) => {
      const item = this.createElem({tag: 'img'}) as HTMLImageElement;
      let href = e.dataTransfer?.getData('href') as string;
      const id = (e.dataTransfer as DataTransfer).getData('id');
      item.dataset.number = id;
      const idnt = (e.dataTransfer as DataTransfer).getData('idnt');
      item.dataset.id = idnt;
      const ind = href?.indexOf('/assets');
      href = '.' + href?.slice(ind);
      item.src = href;
      item.classList.add('draggable');
      item.draggable = true;
      item.style.top = e.pageY * 100 / window.innerHeight - 25*100/window.innerHeight + '%';
      item.style.left = e.pageX * 100 / window.innerWidth - 25*100/window.innerWidth + '%';

      State.utils.addDragEvents(item, href);

      (area as HTMLElement).append(item);
    }

    
    HTMLBuilder.onTreeChange = (url)=> {
      img.src = url.slice(5, -2);
    }

    HTMLBuilder.onGerlandChange = (color: string) => {
      const gerland = this.createGerlands(8, color);
      wrapper.append(gerland);

      HTMLBuilder.gerlandDelete = ()=> {
        gerland.remove();
      }

      return gerland;
    }

    wrapper.append(img);
    wrapper.append(map);

    parent.append(wrapper);
  }
}
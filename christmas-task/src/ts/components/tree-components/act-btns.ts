import { app, State } from '../../../index';
import {HTMLBuilder} from '../html-builder';

export default class ActionBtns extends HTMLBuilder{

  createButtons(parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'tree-settings__action-btns'});
    const btnSound = this.createElem({tag: 'button', className: 'tree-settings__action-btns_sound'});
    const btnSnow = this.createElem({tag: 'button', className: 'tree-settings__action-btns_snow'});
    const resetTreeBtn = this.createElem({tag: 'button', className: 'tree-settings__action-btns_reset', textContent: 'Очистить ёлку'});

    resetTreeBtn.addEventListener('click', () => {
      State.state.currentTree.toys = [];
      State.utils.toggleSnowfall(false);
      State.utils.setLocalStorage();
      app.tree(State.utils.checkFavouriteToys());
    });

    if (State.state.audio) btnSound.classList.add('active');

    btnSound.addEventListener('click', () => {
      btnSound.classList.toggle('active');
      const audio = document.querySelector('audio');
      audio?.pause();
      if (btnSound.classList.contains('active')) {
        State.state.audio = true;
        (audio as HTMLAudioElement).currentTime = 0;
        audio?.play();
      } else {
        State.state.audio = false;
        (audio as HTMLAudioElement).currentTime = 0;
        audio?.pause();
      }
      State.utils.setLocalStorage();
    });

    btnSnow.addEventListener('click', () => {
      btnSnow.classList.toggle('active');
      if (btnSnow.classList.contains('active')) {
        State.utils.toggleSnowfall(true);
      } else {
        State.utils.toggleSnowfall(false);
      }
    })

    wrapper.append(btnSound);
    wrapper.append(btnSnow);
    wrapper.append(resetTreeBtn);

    parent.append(wrapper);
  }

  createSaveBtn(parent: HTMLElement) {
    const wrapper = this.createElem({tag: 'div', className: 'tree-settings__buttons'});
    const saveBtn = this.createElem({tag: 'button', className: 'tree-settings__buttons__save-btn', textContent: 'Сохранить'});
    const clearBtn = this.createElem({tag: 'button', className: 'tree-settings__buttons__save-btn', textContent: 'Очистить хранилище'});
    
    clearBtn.addEventListener('click', () => {
      State.utils.removeStorage();
      app.tree(State.utils.checkFavouriteToys());
    });

    saveBtn.addEventListener('click', () => {
      if (State.state.currentTree.toys.length === 0 || State.state.currentTree.id !== 0) return;
      State.utils.saveTree();
      app.tree(State.utils.checkFavouriteToys());
    })

    wrapper.append(saveBtn);
    wrapper.append(clearBtn);

    parent.append(wrapper);
  }
}


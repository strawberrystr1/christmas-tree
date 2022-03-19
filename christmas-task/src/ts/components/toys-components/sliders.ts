import {HTMLBuilder} from '../html-builder';
import nouislider from '../../../libs/nouislider';
import 'nouislider/dist/nouislider.css';
import { State } from '../../../index';
import { IFilterOptions, IRange, ICreateParams } from '../../interfaces';
import { API } from '../../../../node_modules/nouislider/dist/nouislider';

interface ISliderDesc {
  from: number;
  to: number;
  step: number;
  fromCounter: HTMLElement;
  toCounter: HTMLElement;
  start: number;
  end: number;
  handler: (start: number, end: number) => void;
}

export default class Sliders extends HTMLBuilder{
  initSlider(slider: HTMLElement, sliderParams: ISliderDesc): void {
    const ui: API = nouislider.create(slider,{
      start: [sliderParams.from, sliderParams.to],
      connect: true,
      range: {
        'min': sliderParams.start,
        'max': sliderParams.end
      },
      step: sliderParams.step
    })

    const handleDigits = (values: (string | number)[]): void => {
      sliderParams.fromCounter.textContent = Number(values[0]).toFixed(0);
      sliderParams.toCounter.textContent = Number(values[1]).toFixed(0);
    }

    ui.on('update', handleDigits)
    ui.on('tap', handleDigits)

    ui.on('slide', (values: (string | number)[])=> {
      sliderParams.fromCounter.textContent = Number(values[0]).toFixed(0);
      sliderParams.toCounter.textContent = Number(values[1]).toFixed(0);
      sliderParams.handler(+values[0], +values[1]);
    })
  } 

  createSliders(params: Partial<ICreateParams>[], parent: Element): void {
    const wrapper = this.createElem({tag: 'div', className: 'filters-page__sliders'});

    params.forEach(item => {
      const itemWrapper = this.createElem({tag: 'div', className: 'filters-page__sliders_wrapper'});
      const name = this.createElem({tag: 'p', className: 'filters-page__form_name name', textContent: item.textContent});
      const slider = this.createElem({tag: 'div', id: item.id});
      const rangeWrapper = this.createElem({tag: 'div', className: 'filters-page__sliders_years'});
      const rangeFrom = this.createElem({tag: 'p', className: 'filters-page__sliders_years_year', textContent: (item.from as number).toString()});
      const rangeTo = this.createElem({tag: 'p', className: 'filters-page__sliders_years_year', textContent: (item.to as number).toString()});

      itemWrapper.append(name);
      itemWrapper.append(slider);
      itemWrapper.append(rangeWrapper);
      rangeWrapper.append(rangeFrom);
      rangeWrapper.append(rangeTo);

      wrapper.append(itemWrapper);
      this.initSlider(itemWrapper.querySelector(`#${item.id}`) as HTMLElement, {
        from: (State.state.filters[item.stateName as keyof IFilterOptions] as IRange).start,
        to: (State.state.filters[item.stateName as keyof IFilterOptions] as IRange).end,
        step: item.step as number,
        start: item.from as number,
        end: item.to as number,
        fromCounter: rangeFrom,
        toCounter: rangeTo,
        handler: (start, end) => {
          (State.state.filters[item.stateName as keyof IFilterOptions] as IRange).start = start;
          (State.state.filters[item.stateName as keyof IFilterOptions] as IRange).end = end;
          State.filter.callFilter()
        },
      });
    })

    parent.append(wrapper);
  }
}
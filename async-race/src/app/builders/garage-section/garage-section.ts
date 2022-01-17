import { IState } from '../../types';
import buildCars from './cars';

const buildGarageSection = (state: IState): Node => {
  const garageSectionEl = <HTMLElement>document.createElement('section');
  garageSectionEl.classList.add('garage-page__garage', 'garage');

  garageSectionEl.innerHTML = `
    <h2 class="garage__title">Garage (${state.carsCount})</h2>
    <p class="garage__page-index">Page # ${state.carsPage}</p>
    <div class="garage__modal modal hidden">
      <img class="modal__img" src="./img/trophy.png" alt="winner trophy">
      <p class="modal__text"></p>
    </div>    
  `;

  garageSectionEl.append(buildCars(state));

  return garageSectionEl;
};

export default buildGarageSection;

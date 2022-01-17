import { IState } from '../types';
import buildCars from '../builders/garage-section/cars';

const renderGarage = (state: IState): void => {
  const garageSectionEl = <HTMLElement>document.querySelector('.garage');
  const carsEl = buildCars(state);

  garageSectionEl.innerHTML = '';

  garageSectionEl.innerHTML = `
    <h2 class="garage__title">Garage (${state.carsCount})</h2>
    <p class="garage__page-index">Page #${state.carsPage}</p>
    <div class="garage__modal modal hidden">
      <img class="modal__img" src="./img/trophy.png" alt="winner trophy">
      <p class="modal__text"></p>
    </div>       
  `;

  garageSectionEl.append(carsEl);
};

export default renderGarage;

import { IState } from '../../types';
import buildCar from './car';

const buildCars = (state: IState): Node => {
  const carsEl = <HTMLUListElement>document.createElement('ul');
  carsEl.classList.add('garage__cars', 'cars');

  carsEl.append(...state.cars.map((car) => buildCar(state, car)));

  return carsEl;
};

export default buildCars;

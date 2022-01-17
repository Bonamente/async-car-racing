import { IState } from '../types';
import { getCars } from '../api/api';

const updateGarage = async (state: IState): Promise<void> => {
  const { items, count } = await getCars(state.carsPage);
  state.cars = items;
  state.carsCount = count;

  const prevBtn = <HTMLButtonElement>document.querySelector('.garage-page__prev-button');
  prevBtn.disabled = state.carsPage <= 1;

  const nextBtn = <HTMLButtonElement>document.querySelector('.garage-page__next-button');
  nextBtn.disabled = state.carsPage * 7 >= Number(state.carsCount);
};

export default updateGarage;

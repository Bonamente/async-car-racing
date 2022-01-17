import { createCar, getCar, updateCar, deleteCar, deleteWinner, saveWinner } from '../api/api';
import { IState } from '../types';
import startCar from '../utils/start-car';
import stopCar from '../utils/stop-car';
import race from '../utils/racing/race';
import generateRandomCars from '../utils/generate-cars';
import updateGarage from '../utils/update-garage';
import renderGarage from '../renders/render-garage';

export const handleCreateFormSubmit = async (e: Event, state: IState): Promise<void> => {
  e.preventDefault();

  const nameEl = <HTMLInputElement>document.querySelector('#create-name');
  const colorEl = <HTMLInputElement>document.querySelector('#create-color');
  const car = { name: nameEl.value, color: colorEl.value };

  await createCar(car);
  await updateGarage(state);
  renderGarage(state);

  nameEl.value = '';
};

export const handleUpdateFormSubmit = async (e: Event, state: IState): Promise<void> => {
  e.preventDefault();

  const nameEl = <HTMLInputElement>document.querySelector('#update-name');
  const colorEl = <HTMLInputElement>document.querySelector('#update-color');
  const updateBtn = <HTMLButtonElement>document.querySelector('.update-form__btn');
  const car = { name: nameEl.value, color: colorEl.value };

  if (state.selectedCar) await updateCar(state.selectedCar.id, car);
  await updateGarage(state);
  renderGarage(state);

  nameEl.value = '';
  nameEl.disabled = true;
  colorEl.disabled = true;
  updateBtn.disabled = true;
};

export const handleRaceBtnClick = async (e: Event, state: IState): Promise<void> => {
  const raceBtn = e.target as HTMLButtonElement;
  raceBtn.disabled = true;

  const resetBtn = <HTMLButtonElement>document.querySelector('.controls__reset-btn');
  resetBtn.disabled = false;

  const winner = await race(startCar, state);

  const modalEl = <HTMLDivElement>document.querySelector('.garage__modal');
  const modalText = <HTMLParagraphElement>document.querySelector('.modal__text');
  modalText.innerHTML = `${winner.name} <br> wins in ${winner.time} secs!`;

  modalEl.classList.remove('hidden');

  await saveWinner(winner);

  setTimeout(() => {
    modalEl.classList.add('hidden');
  }, 7000);
};

export const handleResetBtnClick = async (e: Event, state: IState): Promise<void> => {
  const resetBtn = e.target as HTMLButtonElement;
  resetBtn.disabled = true;

  state.cars.map((car) => stopCar(state, car.id));

  const raceBtn = <HTMLButtonElement>document.querySelector('.controls__race-btn');
  raceBtn.disabled = false;
};

export const handleGenerateBtnClick = async (e: Event, state: IState): Promise<void> => {
  const generateBtn = e.target as HTMLButtonElement;
  generateBtn.disabled = true;

  const cars = generateRandomCars();

  await Promise.all(cars.map(async (car) => createCar(car)));
  await updateGarage(state);
  renderGarage(state);

  generateBtn.disabled = false;
};

export const handleSelectBtnClick = async (e: Event, state: IState): Promise<void> => {
  const selectBtn = e.target as HTMLButtonElement;
  const [, , id] = selectBtn.id.split('-');

  const updateCarNameEl = <HTMLInputElement>document.querySelector('#update-name');
  const updateCarColorEl = <HTMLInputElement>document.querySelector('#update-color');
  const updateBtn = <HTMLButtonElement>document.querySelector('.update-form__btn');

  state.selectedCar = await getCar(+id);

  updateCarNameEl.value = state.selectedCar.name;
  updateCarColorEl.value = state.selectedCar.color;
  updateCarNameEl.disabled = false;
  updateCarColorEl.disabled = false;
  updateBtn.disabled = false;
};

export const handleRemoveBtnClick = async (e: Event, state: IState): Promise<void> => {
  const removeBtn = e.target as HTMLButtonElement;
  const [, , id] = removeBtn.id.split('-');

  await deleteCar(+id);
  await deleteWinner(+id);
  await updateGarage(state);
  renderGarage(state);
};

export const handleStartBtnClick = (e: Event, state: IState) => {
  const startBtn = e.target as HTMLButtonElement;
  const [, , id] = startBtn.id.split('-');

  return startCar(state, +id);
};

export const handleStopBtnClick = (e: Event, state: IState) => {
  const stopBtn = e.target as HTMLButtonElement;
  const [, , id] = stopBtn.id.split('-');

  return stopCar(state, +id);
};

export const handlePrevBtnClick = async (e: Event, state: IState): Promise<void> => {
  switch (state.activePage) {
    case 'garage-page': {
      state.carsPage -= 1;

      await updateGarage(state);
      renderGarage(state);
      break;
    }
    case 'winners-page': {
      state.winnersPage -= 1;

      // TODO
      // await updateWinners(state);
      // renderWinners(state);
      break;
    }
    default:
      throw new Error('invalid activePage value');
  }
};

export const handleNextBtnClick = async (e: Event, state: IState): Promise<void> => {
  switch (state.activePage) {
    case 'garage-page': {
      state.carsPage += 1;

      await updateGarage(state);
      renderGarage(state);
      break;
    }
    case 'winners-page': {
      state.winnersPage += 1;

      // TODO
      // await updateWinners(state);
      // renderWinners(state);
      break;
    }
    default:
      throw new Error('invalid activePage value');
  }
};

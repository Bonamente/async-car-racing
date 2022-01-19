import { createCar, getCar, updateCar, deleteCar, deleteWinner, saveWinner } from '../api/api';
import { IState, RaceStatus } from '../types';
import startCar from '../utils/start-car';
import stopCar from '../utils/stop-car';
import race from '../utils/racing/race';
import generateRandomCars from '../utils/generate-cars';
import renderGarage from '../renders/render-garage';
import updateGarage from '../utils/update-garage';
import renderWinners from '../renders/render-winners';
import updateWinners from '../utils/update-winners';
import { setSort } from '../utils/set-sort';

export const handleFormInput = (e: Event, state: IState): void => {
  const inputEl = e.target as HTMLInputElement;
  const [formName, elName] = inputEl.name.split('-');

  state.forms[formName].processState = 'filling';
  state.forms[formName][elName] = inputEl.value;
};

export const handleCreateFormSubmit = async (e: Event, state: IState): Promise<void> => {
  e.preventDefault();

  const nameEl = <HTMLInputElement>document.querySelector('#create-name');
  const colorEl = <HTMLInputElement>document.querySelector('#create-color');
  const car = { name: nameEl.value, color: colorEl.value };

  const raceBtn = <HTMLButtonElement>document.querySelector('.controls__race-btn');
  raceBtn.disabled = false;

  await createCar(car);
  await updateGarage(state);
  renderGarage(state);

  nameEl.value = '';
  colorEl.value = '#ffffff';

  state.forms.create.processState = 'idle';
  state.forms.create.name = '';
  state.forms.create.color = '#ffffff';
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
  colorEl.value = '#ffffff';
  nameEl.disabled = true;
  colorEl.disabled = true;
  updateBtn.disabled = true;

  state.forms.update.processState = 'idle';
  state.forms.update.name = '';
  state.forms.update.color = '#ffffff';
};

export const handleRaceBtnClick = async (e: Event, state: IState): Promise<void> => {
  const raceBtn = e.target as HTMLButtonElement;
  raceBtn.disabled = true;

  if (state.cars.length === 0) {
    return;
  }

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
  }, 5000);
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

  const raceBtn = <HTMLButtonElement>document.querySelector('.controls__race-btn');
  raceBtn.disabled = false;

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

  state.forms.update.processState = 'filling';
  state.forms.update.name = state.selectedCar.name;
  state.forms.update.color = state.selectedCar.color;
};

export const handleRemoveBtnClick = async (e: Event, state: IState): Promise<void> => {
  const removeBtn = e.target as HTMLButtonElement;
  const [, , id] = removeBtn.id.split('-');

  await deleteCar(+id);
  await deleteWinner(+id);
  await updateGarage(state);
  renderGarage(state);
};

export const handleStartBtnClick = (e: Event, state: IState): Promise<RaceStatus> => {
  const startBtn = e.target as HTMLButtonElement;
  const [, , id] = startBtn.id.split('-');

  return startCar(state, +id);
};

export const handleStopBtnClick = (e: Event, state: IState): Promise<void> => {
  const stopBtn = e.target as HTMLButtonElement;
  const [, , id] = stopBtn.id.split('-');

  return stopCar(state, +id);
};

export const handleSortBtnClick = (e: Event, state: IState): void => {
  const sortBtn = e.target as HTMLButtonElement;

  if (sortBtn.classList.contains('table__wins')) {
    setSort(state, 'wins');
  } else if (sortBtn.classList.contains('table__time')) {
    setSort(state, 'time');
  }
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

      await updateWinners(state);
      renderWinners(state);
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

      await updateWinners(state);
      renderWinners(state);
      break;
    }
    default:
      throw new Error('invalid activePage value');
  }
};

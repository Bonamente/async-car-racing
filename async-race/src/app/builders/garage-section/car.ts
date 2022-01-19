import { Car, IState } from '../../types';
import {
  handleSelectBtnClick,
  handleRemoveBtnClick,
  handleStartBtnClick,
  handleStopBtnClick,
} from '../../handlers/handlers';

export const getCarImage = (color: string): string => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" 
  style="enable-background:new 0 0 1000 1000" xml:space="preserve"><style>
  .st1{fill:#000000}.st2{fill:#b3b3b3;stroke:#000;stroke-width:33.9138;stroke-miterlimit:10}</style>
  <switch><g><g id="Layer_2">
  <path d="M662.9 452.8c-213.7-125-332.3-90.7-332.3-90.7-21.4-.2-282 60.8-282 
  60.8 6.6 12.9 8.6 46.8 8.6 46.8 6.7 62.5 40.7 93.7 40.7 93.7 21.9 28.6 45.9 
  33.2 45.9 33.2s681.9 2.5 738.5 0c56.6-2.5 69.1-33.2 69.1-33.2-23.9-107.8-288.5-110.6-288.5-110.6z" 
  style="fill:${color}"/><path class="st1" d="M626.7 451.6 391.9 435l-61.3-53.4s95.9-34.3 
  296.1 70zM345.2 428.9l-41.7-37.2s-38.5 4.7-79.9 19l121.6 18.2z"/>
  <circle class="st2" cx="221.4" cy="574" r="68.2"/>
  <circle class="st2" cx="756.1" cy="574" r="68.2"/></g></g></switch></svg>`;

export const buildCar = (state: IState, car: Car): Node => {
  const { id, name, color } = car;

  const carEl = <HTMLLIElement>document.createElement('li');
  carEl.classList.add('cars__item', 'car');
  carEl.setAttribute('tabindex', '0');

  const carControlsEl = <HTMLDivElement>document.createElement('div');
  carControlsEl.classList.add('car__controls');

  const controlsContainer = <HTMLDivElement>document.createElement('div');
  controlsContainer.classList.add('car__controls-container');

  const selectBtn = <HTMLButtonElement>document.createElement('button');
  selectBtn.textContent = 'Select';
  selectBtn.classList.add('button', 'car__select-btn');
  selectBtn.id = `select-car-${id}`;

  const removeBtn = <HTMLButtonElement>document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('button', 'car__remove-btn');
  removeBtn.id = `remove-car-${id}`;

  const carNameEl = <HTMLParagraphElement>document.createElement('p');
  carNameEl.textContent = `${name}`;
  carNameEl.classList.add('car__name');

  const carTrackEl = <HTMLDivElement>document.createElement('div');
  carTrackEl.classList.add('car__track');

  const carInnerContainer = <HTMLDivElement>document.createElement('div');
  carInnerContainer.classList.add('car__inner-container');

  const engineEl = <HTMLDivElement>document.createElement('div');
  engineEl.classList.add('car__engine-controls', 'engine');

  const engineStartBtn = <HTMLButtonElement>document.createElement('button');
  engineStartBtn.textContent = 'Start';
  engineStartBtn.classList.add('button', 'engine__start-btn');
  engineStartBtn.id = `start-car-${id}`;

  const engineStopBtn = <HTMLButtonElement>document.createElement('button');
  engineStopBtn.textContent = 'Stop';
  engineStopBtn.classList.add('button', 'engine__stop-btn');
  engineStopBtn.id = `stop-car-${id}`;
  engineStopBtn.disabled = true;

  const carInstance = <HTMLDivElement>document.createElement('div');
  carInstance.classList.add('car__instance');
  carInstance.id = `car-${id}`;
  carInstance.innerHTML = getCarImage(color);

  const carFinish = <HTMLDivElement>document.createElement('div');
  carFinish.innerHTML = '<img src="./img/finish-flag.png" alt="finish">';
  carFinish.classList.add('car__finish');
  carFinish.id = `finish-${id}`;

  selectBtn.addEventListener('click', (e: Event) => handleSelectBtnClick(e, state));
  removeBtn.addEventListener('click', (e: Event) => handleRemoveBtnClick(e, state));
  engineStartBtn.addEventListener('click', (e: Event) => handleStartBtnClick(e, state));
  engineStopBtn.addEventListener('click', (e: Event) => handleStopBtnClick(e, state));

  controlsContainer.append(selectBtn, removeBtn);
  carControlsEl.append(controlsContainer, carNameEl);
  engineEl.append(engineStartBtn, engineStopBtn);
  carInnerContainer.append(engineEl, carInstance);
  carTrackEl.append(carInnerContainer, carFinish);
  carEl.append(carControlsEl, carTrackEl);

  return carEl;
};

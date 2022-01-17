import { IState } from '../../types';
import { handleRaceBtnClick, handleResetBtnClick, handleGenerateBtnClick } from '../../handlers/handlers';

const buildControlsButtons = (state: IState): Node => {
  const buttonsContainerEl = <HTMLUListElement>document.createElement('ul');
  buttonsContainerEl.classList.add('controls__buttons');

  const raceBtn = <HTMLButtonElement>document.createElement('button');
  raceBtn.classList.add('button', 'controls__race-btn');
  raceBtn.textContent = 'Race';

  const resetBtn = <HTMLButtonElement>document.createElement('button');
  resetBtn.classList.add('button', 'controls__reset-btn');
  resetBtn.textContent = 'Reset';
  resetBtn.disabled = true;

  const generateBtn = <HTMLButtonElement>document.createElement('button');
  generateBtn.classList.add('button', 'controls__generate-btn');
  generateBtn.textContent = 'Generate cars';

  raceBtn.addEventListener('click', (e: Event) => handleRaceBtnClick(e, state));
  resetBtn.addEventListener('click', (e: Event) => handleResetBtnClick(e, state));
  generateBtn.addEventListener('click', (e: Event) => handleGenerateBtnClick(e, state));

  const items = [raceBtn, resetBtn, generateBtn].map((btn) => {
    const liEl = <HTMLLIElement>document.createElement('li');
    liEl.append(btn);

    return liEl;
  });

  buttonsContainerEl.append(...items);

  return buttonsContainerEl;
};

export default buildControlsButtons;

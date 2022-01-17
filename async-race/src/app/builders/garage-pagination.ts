import { IState } from '../types';
import { handlePrevBtnClick, handleNextBtnClick } from '../handlers/handlers';
import { MAX_ITEMS_PER_GARAGE_PAGE } from '../api/api';

const buildGaragePagination = (state: IState): Node => {
  const paginationEl = <HTMLDivElement>document.createElement('div');
  paginationEl.classList.add('garage-page__pagination');

  const prevBtn = <HTMLButtonElement>document.createElement('button');
  prevBtn.classList.add('button', 'garage-page__prev-button');
  prevBtn.innerHTML = `<span>Prev</span>`;
  prevBtn.disabled = state.carsPage === 1;

  const nextBtn = <HTMLButtonElement>document.createElement('button');
  nextBtn.classList.add('button', 'garage-page__next-button');
  nextBtn.innerHTML = `<span>Next</span>`;
  nextBtn.disabled = state.carsCount && +state.carsCount <= MAX_ITEMS_PER_GARAGE_PAGE ? true : false;

  prevBtn.addEventListener('click', (e: Event) => handlePrevBtnClick(e, state));
  nextBtn.addEventListener('click', (e: Event) => handleNextBtnClick(e, state));

  paginationEl.append(prevBtn, nextBtn);

  return paginationEl;
};

export default buildGaragePagination;

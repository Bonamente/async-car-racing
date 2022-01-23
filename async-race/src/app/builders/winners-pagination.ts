import { IState } from '../types';
import { handlePrevBtnClick, handleNextBtnClick } from '../handlers/handlers';
import { MAX_ITEMS_PER_WINNERS_PAGE } from '../api/api';

const buildWinnersPagination = (state: IState): Node => {
  const paginationEl = <HTMLDivElement>document.createElement('div');
  paginationEl.classList.add('winners-page__pagination');

  const prevBtn = <HTMLButtonElement>document.createElement('button');
  prevBtn.classList.add('button', 'winners-page__prev-button');
  prevBtn.innerHTML = `<span>Prev</span>`;
  prevBtn.disabled = state.winnersPage === 1;

  const nextBtn = <HTMLButtonElement>document.createElement('button');
  nextBtn.classList.add('button', 'winners-page__next-button');
  nextBtn.innerHTML = `<span>Next</span>`;

  nextBtn.disabled = state.winnersPage >= Number(state.winnersCount) / MAX_ITEMS_PER_WINNERS_PAGE;

  prevBtn.addEventListener('click', (e: Event) => handlePrevBtnClick(e, state));
  nextBtn.addEventListener('click', (e: Event) => handleNextBtnClick(e, state));

  paginationEl.append(prevBtn, nextBtn);

  return paginationEl;
};

export default buildWinnersPagination;

import { IState } from '../types';
import buildHtmlForTable from '../builders/winners-section/html-for-table';
import { handleSortBtnClick } from '../handlers/handlers';
import updateWinners from '../utils/update-winners';

const renderWinners = async (state: IState): Promise<void> => {
  await updateWinners(state);

  const prevBtn = <HTMLButtonElement>document.querySelector('.winners-page__prev-button');
  prevBtn.disabled = state.winnersPage <= 1;

  const nextBtn = <HTMLButtonElement>document.querySelector('.winners-page__next-button');
  nextBtn.disabled = state.winnersPage * 10 >= Number(state.winnersCount);

  const winnersSectionEl = <HTMLElement>document.querySelector('.winners');
  winnersSectionEl.innerHTML = '';
  winnersSectionEl.innerHTML = `
    <h2 class="winners__title">Winners (${state.winnersCount})</h2>
    <p class="winners__page-index">Page #${state.winnersPage}</p>
    <div class="winners__image-wrapper"><img src="./img/winners.png" alt="winners"></div>     
  `;

  const winnersTableEl = <HTMLTableElement>document.createElement('table');
  winnersTableEl.classList.add('winners__table', 'table');
  winnersTableEl.innerHTML = winnersTableEl.innerHTML = buildHtmlForTable(state);
  winnersTableEl.addEventListener('click', (e: Event) => handleSortBtnClick(e, state));

  winnersSectionEl.append(winnersTableEl);
};

export default renderWinners;

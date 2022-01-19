import { IState } from '../../types';
import buildHtmlForTable from './html-for-table';
import { handleSortBtnClick } from '../../handlers/handlers';
import updateWinners from '../../utils/update-winners';

const buildWinnersSection = async (state: IState): Promise<Node> => {
  await updateWinners(state);

  const winnersSectionEl = <HTMLElement>document.createElement('section');
  winnersSectionEl.classList.add('winners-page__winners', 'winners');

  const winnersTableEl = <HTMLTableElement>document.createElement('table');
  winnersTableEl.classList.add('winners__table', 'table');

  winnersSectionEl.innerHTML = `
    <h2 class="winners__title">Winners (${state.winnersCount})</h2>
    <p class="winners__page-index">Page #${state.winnersPage}</p>
    <div class="winners__image-wrapper"><img src="./img/winners.png" alt="winners"></div>    
  `;

  winnersTableEl.innerHTML = buildHtmlForTable(state);
  winnersTableEl.addEventListener('click', (e: Event) => handleSortBtnClick(e, state));

  winnersSectionEl.append(winnersTableEl);

  return winnersSectionEl;
};

export default buildWinnersSection;

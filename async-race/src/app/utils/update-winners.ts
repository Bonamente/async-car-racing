import { IState } from '../types';
import { getWinners } from '../api/api';

const updateWinners = async (state: IState): Promise<void> => {
  const { items, count } = await getWinners({
    page: state.winnersPage,
    sort: state.sortBy,
    order: state.sortOrder,
  });

  state.winners = items;
  state.winnersCount = count;

  // const prevBtn = <HTMLButtonElement>document.querySelector('.winners-page__prev-button');
  // prevBtn.disabled = state.winnersPage <= 1;

  // const nextBtn = <HTMLButtonElement>document.querySelector('.winners-page__next-button');
  // nextBtn.disabled = state.winnersPage * 10 >= Number(state.winnersCount);
};

export default updateWinners;

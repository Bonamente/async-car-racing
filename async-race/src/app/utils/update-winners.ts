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
};

export default updateWinners;

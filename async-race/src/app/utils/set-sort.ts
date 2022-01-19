import { IState } from '../types';
import renderWinners from '../renders/render-winners';
import updateWinners from './update-winners';

export const setSort = async (state: IState, sortBy: string): Promise<void> => {
  state.sortBy = sortBy;
  state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';

  await updateWinners(state);
  renderWinners(state);
};

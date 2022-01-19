import { IState } from './types';
import { getCars, getWinners } from './api/api';
import renderPage from './renders/render-page';

export const app = async () => {
  const { items: cars, count: carsCount } = await getCars(1);
  const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

  const state: IState = {
    activePage: 'garage-page',

    forms: {
      create: {
        processState: 'idle',
        name: '',
        color: '#ffffff',
      },

      update: {
        processState: 'idle',
        name: '',
        color: '#ffffff',
      },
    },

    carsPage: 1,
    winnersPage: 1,

    cars,
    carsCount,
    selectedCar: null,

    winners,
    winnersCount,

    animation: {},

    sortBy: '',
    sortOrder: 'DESC',
  };

  renderPage(state);
};

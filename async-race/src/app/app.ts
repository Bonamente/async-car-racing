import { IState } from './types';
import { getCars, getWinners } from './api/api';
import renderPage from './renders/render-page';

export const app = async () => {
  try {
    const { items: cars, count: carsCount } = await getCars(1);
    const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

    const state: IState = {
      activePage: 'garage-page',

      isRacing: false,

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
  } catch {
    document.body.innerHTML = `
      <div class="no-server">
        <h1 class="no-server__title" >Hello!</h1> 
        <p class="no-server__text">To use this app you need to start the 
        <a href="https://github.com/mikhama/async-race-api" target="_blank">server</a> first.</p> 
      </div>`;
  }
};

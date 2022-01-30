import { IState } from '../types';
import { stopEngine } from '../api/api';

const stopCar = async (state: IState, id: number): Promise<void> => {
  const engineStopBtn = <HTMLButtonElement>document.querySelector(`#stop-car-${id}`);
  engineStopBtn.disabled = true;

  const engineStartBtn = <HTMLButtonElement>document.querySelector(`#start-car-${id}`);
  engineStartBtn.disabled = false;

  await stopEngine(id);

  if (state.activePage === 'garage-page') {
    const carInstance = <HTMLElement>document.querySelector(`#car-${id}`);
    carInstance.style.transform = 'translateX(0) translateY(29px)';

    if (state.animation[id]) window.cancelAnimationFrame(state.animation[id].id);
  }
};

export default stopCar;

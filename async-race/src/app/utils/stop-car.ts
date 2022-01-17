import { IState } from '../types';
import { stopEngine } from '../api/api';

const stopCar = async (state: IState, id: number): Promise<void> => {
  const engineStopBtn = <HTMLButtonElement>document.querySelector(`#stop-car-${id}`);
  engineStopBtn.disabled = true;

  await stopEngine(id);

  const engineStartBtn = <HTMLButtonElement>document.querySelector(`#start-car-${id}`);
  engineStartBtn.disabled = false;

  const carInstance = <HTMLElement>document.querySelector(`#car-${id}`);
  carInstance.style.transform = 'translateX(0) translateY(29px)';

  if (state.animation[id]) window.cancelAnimationFrame(state.animation[id].id);
};

export default stopCar;

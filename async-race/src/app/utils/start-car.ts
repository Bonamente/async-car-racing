import { IState, RaceStatus } from '../types';
import { getDriveStatus, startEngine } from '../api/api';
import getDistanceBetweenElems from './animation/get-distance';
import animate from './animation/animate';

const startCar = async (state: IState, id: number): Promise<RaceStatus> => {
  const engineStartBtn = <HTMLButtonElement>document.querySelector(`#start-car-${id}`);
  engineStartBtn.disabled = true;

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  const engineStopBtn = <HTMLButtonElement>document.querySelector(`#stop-car-${id}`);
  engineStopBtn.disabled = false;

  const carInstance = <HTMLElement>document.querySelector(`#car-${id}`);
  const finish = <HTMLElement>document.querySelector(`#finish-${id}`);
  const distanceBetweenElems = Math.floor(getDistanceBetweenElems(carInstance, finish)) + 100;

  state.animation[id] = animate(carInstance, distanceBetweenElems, time);

  const { success } = await getDriveStatus(id);

  if (!success) window.cancelAnimationFrame(state.animation[id].id);

  return { success, id, time };
};

export default startCar;

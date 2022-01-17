import { IState, RaceStatus, RaceResult } from '../../types';

const raceAll = async (promises: Promise<RaceStatus>[], ids: number[], state: IState): Promise<RaceResult> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIdx = ids.findIndex((idx) => idx === id);
    const restPromises = [...promises.slice(0, failedIdx), ...promises.slice(failedIdx + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIdx), ...ids.slice(failedIdx + 1, ids.length)];

    return raceAll(restPromises, restIds, state);
  }

  const winner = state.cars.filter((car) => car.id === id)[0];

  return { ...winner, time: +(time / 1000).toFixed(2) };
};

const race = async (
  action: { (state: IState, id: number): Promise<RaceStatus> },
  state: IState
): Promise<RaceResult> => {
  const promises = state.cars.map((car) => action(state, car.id));
  const winner = await raceAll(
    promises,
    state.cars.map((car) => car.id),
    state
  );

  return winner;
};

export default race;

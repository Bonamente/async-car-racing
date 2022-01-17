const animate = (car: HTMLElement, distanceBetweenElems: number, animationTime: number): { id: number } => {
  const targetCar = car;
  const state: { id: number } = { id: 1 };

  let start: number | null = null;

  const getStep = (timestamp: number) => {
    if (!start) start = timestamp;

    const time = timestamp - start;
    const passed = Math.round(time * (distanceBetweenElems / animationTime));

    targetCar.style.transform = `translateX(${Math.min(passed, distanceBetweenElems)}px) translateY(29px)`;

    if (passed < distanceBetweenElems) state.id = window.requestAnimationFrame(getStep);
  };

  state.id = window.requestAnimationFrame(getStep);

  return state;
};

export default animate;

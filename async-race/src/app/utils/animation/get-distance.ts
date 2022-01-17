const getElPosition = (el: HTMLElement): { [key: string]: number } => {
  const { top, left, width, height } = el.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
};

const getDistanceBetweenElems = (el1: HTMLElement, el2: HTMLElement): number => {
  const el1Position = getElPosition(el1);
  const el2Position = getElPosition(el2);

  return Math.hypot(el1Position.x - el2Position.x, el2Position.y - el1Position.y);
};

export default getDistanceBetweenElems;

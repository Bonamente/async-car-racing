export type CarSpecs = {
  name: string;
  color: string;
};

export type Engine = {
  velocity: number;
  distance: number;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Cars = {
  items: [];
  count: string | null;
};

export type Sort = 'id' | 'wins' | 'time' | '';

export type Order = 'ASC' | 'DESC' | '';

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = {
  items: { name: string; color: string; id: number; car: Car }[];
  count: string;
};

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

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

type Items = { id: number; wins: string; time: string; car: Car }[];

export type Winners = {
  items: Items;
  count: string;
};

export type RaceStatus = {
  success: boolean;
  id: number;
  time: number;
};

export type RaceResult = {
  name: string;
  color: string;
  id: number;
  time: number;
};

export interface IForms {
  [key: string]: Record<string, string>;
}

export interface IState {
  activePage: string;

  forms: IForms;

  carsPage: number;
  winnersPage: number;

  cars: Car[];
  carsCount: string | null;
  selectedCar: Car | null;

  winners: Items;
  winnersCount: string | null;

  animation: { [key: number]: { id: number } };

  sortBy: string;
  sortOrder: string;
}

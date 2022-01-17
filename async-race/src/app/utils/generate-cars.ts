import { CarSpecs } from '../types';

const numberOfGeneratedCars = 100;

const hexChars = '0123456789ABCDEF';

const makes = [
  'Alfa Romeo',
  'Audi',
  'BMW',
  'Bugatti',
  'Ferrari',
  'Ford',
  'Mercedes-Benz',
  'Peugeot',
  'Porsche',
  'Toyota',
];

const models = ['8C', 'Chiron', 'RS', 'V12 LMR', '488', 'GT40', 'CLR', '908', '956', 'TS050'];

const generateRandomName = () => {
  const make = makes[Math.floor(Math.random() * makes.length)];
  const model = models[Math.floor(Math.random() * models.length)];

  return `${make} ${model}`;
};

const generateRandomColor = () => {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += hexChars[Math.floor(Math.random() * hexChars.length)];
  }

  return color;
};

const generateRandomCars = (carsCount = numberOfGeneratedCars): CarSpecs[] =>
  new Array(carsCount).fill(1).map(() => ({ name: generateRandomName(), color: generateRandomColor() }));

export default generateRandomCars;

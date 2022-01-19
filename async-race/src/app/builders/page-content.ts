import { IState } from '../types';
import buildGaragePageContent from '../pages/garage-page/garage-page';
import buildWinnersPageContent from '../pages/winners-page/winners-page';

const buildPageContent = async (state: IState): Promise<Node> => {
  const { activePage } = state;

  const mainElement = <HTMLElement>document.createElement('main');
  mainElement.classList.add('main');

  let activePageContent: HTMLElement;

  switch (activePage) {
    case 'garage-page':
      activePageContent = buildGaragePageContent(state);
      break;
    case 'winners-page':
      activePageContent = await buildWinnersPageContent(state);
      break;
    default:
      throw new Error('invalid activePage value');
  }

  mainElement.append(activePageContent);

  return mainElement;
};

export default buildPageContent;

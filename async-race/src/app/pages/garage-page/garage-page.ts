import { IState } from '../../types';
import buildControlsSection from '../../builders/controls-section/controls-section';
import buildGarageSection from '../../builders/garage-section/garage-section';
import buildGaragePagination from '../../builders/garage-pagination';

const buildGaragePageContent = (state: IState): HTMLElement => {
  const pageContainer = <HTMLDivElement>document.createElement('div');
  pageContainer.classList.add('page-container');
  pageContainer.append(buildControlsSection(state), buildGarageSection(state), buildGaragePagination(state));

  return pageContainer;
};

export default buildGaragePageContent;

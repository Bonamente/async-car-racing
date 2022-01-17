import { IState } from '../../types';
import buildCreateForm from './create-form';
import buildUpdateForm from './update-form';
import buildControlsButtons from './controls-buttons';

const buildControlsSection = (state: IState): Node => {
  const controlsSectionEl = <HTMLElement>document.createElement('section');
  controlsSectionEl.classList.add('garage-page__controls', 'controls');

  const controlsContainer = <HTMLDivElement>document.createElement('div');
  controlsContainer.classList.add('controls__container');
  controlsContainer.append(buildCreateForm(state), buildUpdateForm(state), buildControlsButtons(state));

  controlsSectionEl.innerHTML = '<h2 class="controls__title sr-only">Main controls</h2>';
  controlsSectionEl.append(controlsContainer);

  return controlsSectionEl;
};

export default buildControlsSection;

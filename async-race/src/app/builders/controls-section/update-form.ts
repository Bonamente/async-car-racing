import { IState } from '../../types';
import { handleUpdateFormSubmit } from '../../handlers/handlers';

const buildUpdateForm = (state: IState): Node => {
  const formElement = <HTMLFormElement>document.createElement('form');
  formElement.classList.add('controls__form', 'update-form');

  formElement.innerHTML = `
    <label class="update-form__label update-form__label--name sr-only" for="update-name">Change name</label>
    <input class="update-form__input update-form__input--name" type="text" id="update-name" 
    name="update-name" required disabled>
    <label class="update-form__label update-form__label--color sr-only" for="update-color">Change color</label>
    <input class="update-form__input update-form__input--color" type="color" id="update-color" 
    name="update-color" value="#ffffff" disabled>
    <button class="button update-form__btn" type="submit" disabled>Update</button>
  `;

  formElement.addEventListener('submit', (e: Event) => handleUpdateFormSubmit(e, state));

  return formElement;
};

export default buildUpdateForm;

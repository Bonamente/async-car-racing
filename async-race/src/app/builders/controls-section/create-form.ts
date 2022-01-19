import { IState } from '../../types';
import { handleFormInput, handleCreateFormSubmit } from '../../handlers/handlers';

const buildCreateForm = (state: IState): Node => {
  const formElement = <HTMLFormElement>document.createElement('form');
  formElement.classList.add('controls__form', 'create-form');

  formElement.innerHTML = `
    <label class="create-form__label create-form__label--name sr-only" for="create-name">Input name</label>
    <input class="create-form__input create-form__input--name" type="text" 
    id="create-name" name="create-name" value="${state.forms.create.name}" required>
    <label class="create-form__label create-form__label--color sr-only" for="create-color">Select color</label>
    <input class="create-form__input create-form__input--color" type="color" 
      id="create-color" name="create-color" value="${state.forms.create.color}">
    <button class="button create-form__btn" type="submit">Create</button>  
  `;

  formElement.addEventListener('change', (e: Event) => handleFormInput(e, state));
  formElement.addEventListener('submit', (e: Event) => handleCreateFormSubmit(e, state));

  return formElement;
};

export default buildCreateForm;

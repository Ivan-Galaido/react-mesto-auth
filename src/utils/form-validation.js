const handleValidity = (form, setState) => {
  const inputList = Array.from(form.querySelectorAll("input"));
  inputList.forEach((input) => checkInputValidity(form, input));
  toggleButtonState(inputList, setState);
};

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const showInputError = (form, input, errorMessage) => {
  const errorElem = form.querySelector(`.${input.id}-error`);
  input.classList.add("form__input_type_error");
  errorElem.textContent = errorMessage;
  errorElem.classList.add("form__error_visible");
};

const hideInputError = (form, input) => {
  const errorElem = form.querySelector(`.${input.id}-error`);
  input.classList.remove("form__input_type_error");
  errorElem.classList.remove("form__error_visible");
  errorElem.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, setState) => {
  if (hasInvalidInput(inputList)) {
    setState(false);
  } else {
    setState(true);
  }
};

const resetValidation = (form, setState) => {
  const inputList = Array.from(form.querySelectorAll("input"));
  inputList.forEach((input) => hideInputError(form, input));
  toggleButtonState(inputList, setState);
};

export { handleValidity, resetValidation };

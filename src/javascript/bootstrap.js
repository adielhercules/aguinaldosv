import currency from './currency';
import Calculator from './Calculator';
import { TIME_OF_EMPLOYMENT_MONTHS } from './constants';

let submitBtnAnimationTimer;
function animateSubmitButton() {
  const resultsContainer = document.getElementById('results-container');

  if (submitBtnAnimationTimer) {
    clearTimeout(submitBtnAnimationTimer);
  }

  resultsContainer.classList.add('animated', 'tada');

  submitBtnAnimationTimer = setTimeout(() => {
    resultsContainer.classList.remove('animated', 'tada');
  }, 300);
}

function initialize() {
  const form = document.getElementById('calculateAguinaldo');
  const { elements } = form;
  const {
    salary: salaryField,
    timeOfEmployment: timeOfEmploymentField,
    period: periodField,
    timeOfEmploymentUnit: timeOfEmploymentUnitField,
  } = elements;
  const alert = document.getElementById('alert-no-date');
  const submitBtn = document.getElementById('submitBtn');
  const result = document.getElementById('result');
  const snowflakes = document.getElementById('snowflakes');
  const taxes = document.getElementById('taxes');

  function onSubmit(e) {
    const salary = salaryField.value;
    const timeOfEmployment = timeOfEmploymentField.value;
    const period = periodField.value;
    const timeOfEmploymentUnit = timeOfEmploymentUnitField.value;
    const emptySalary = String(salary).length === 0;
    const emptyTimeOfEmployment = String(timeOfEmployment).length === 0;

    e.preventDefault();

    if (emptySalary || emptyTimeOfEmployment) {
      alert.classList.remove('hidden');
    }

    if (emptySalary) {
      salaryField.focus();
      return;
    }

    if (emptyTimeOfEmployment) {
      timeOfEmploymentField.focus();
      return;
    }

    snowflakes.classList.remove('hidden');

    const timeOfEmploymentMultiplier = timeOfEmploymentUnit === TIME_OF_EMPLOYMENT_MONTHS ? 1 : 12;
    const timeOfEmploymentAsNumber = Number(timeOfEmployment);
    const salaryAsNumber = Number(salary);
    const time = timeOfEmploymentAsNumber * timeOfEmploymentMultiplier;
    const { total: aguinaldo, taxes: totalTaxes } = Calculator.calculateAsFixed({
      salary: salaryAsNumber,
      time,
      period,
    });

    animateSubmitButton();

    result.innerHTML = currency(aguinaldo).replace(/\$/g, '');
    taxes.innerHTML = currency(totalTaxes);
  }

  function onChange() {
    alert.classList.add('hidden');
  }

  form.addEventListener('submit', onSubmit);
  timeOfEmploymentField.addEventListener('change', onChange);
  salaryField.addEventListener('change', onChange);
  submitBtn.addEventListener('click', onSubmit);
}

export default () => {
  document.addEventListener('DOMContentLoaded', initialize);
};

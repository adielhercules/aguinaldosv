import animateScrollTo from 'animated-scroll-to';

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
  }, 800);
}

function cloneSnowflakes(parent) {
  const snowflake = parent.children[0];

  [...Array(11)].forEach(() => {
    parent.appendChild(snowflake.cloneNode(true));
  });
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
      animateScrollTo(salaryField, { verticalOffset: -80 }).then(() => salaryField.focus());
      return;
    }

    if (emptyTimeOfEmployment) {
      animateScrollTo(timeOfEmploymentField, { verticalOffset: -80 }).then(() =>
        timeOfEmploymentField.focus(),
      );
      return;
    }

    alert.classList.add('hidden');
    snowflakes.classList.remove('invisible');
    snowflakes.classList.add('animated', 'fadeIn');

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

    animateScrollTo(submitBtn, { verticalOffset: 25 });

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

  cloneSnowflakes(snowflakes);
}

export default () => {
  document.addEventListener('DOMContentLoaded', initialize);
};

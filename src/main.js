import './polyfills';
import './stylesheets/style.css';

function currency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const now = new Date();
const currentYear = now.getFullYear();

function noOffsetDate(d) {
  return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
}

const nextBonusDate = noOffsetDate(new Date(`${currentYear}-12-12`));

function getNumberOfDaysInPeriod(period) {
  switch (period) {
    case 'quincenal':
      return 15;
    default:
      return 30;
  }
}

function getAguinaldo(salary, hiringDate, period) {
  // Constants
  let days = 0;
  const oneDay = 1000 * 60 * 60 * 24;
  const noOfDays = Math.ceil((nextBonusDate.getTime() - hiringDate.getTime()) / oneDay);
  const numOfDaysInPeriod = getNumberOfDaysInPeriod(period);

  if (noOfDays <= 365) {
    days = 15 * ((noOfDays * 100) / 365 / 100);
  } else if (noOfDays > 365 && noOfDays < 365 * 3) {
    days = 15;
  } else if (noOfDays > 365 * 3 && noOfDays < 3650) {
    days = 19;
  } else if (noOfDays > 3650) {
    days = 21;
  }

  const dailySalary = salary / numOfDaysInPeriod;

  const aguinaldo = dailySalary * days;

  return currency(aguinaldo.toFixed(2));
}

function iterateClassList(classesArray, element, action) {
  classesArray.forEach(function addClassName(className) {
    element.classList[action](className);
  });
}

function initialize() {
  const form = document.getElementById('calculateAguinaldo');
  const salaryField = form.elements.salary;
  const dateField = form.elements.date;
  const periodField = form.elements.periodo;
  const alert = document.getElementById('alert-no-date');
  const submitBtn = document.getElementById('submitBtn');
  const result = document.getElementById('result');
  const activePeriodClasses = ['border-green-400', 'hover:bg-green-600'];
  const inactivePeriodClasses = ['border-xmas', 'hover:bg-green-900'];

  function onSubmit(e) {
    const salary = salaryField.value;
    const date = dateField.valueAsDate;
    const periodo = periodField.value;
    const emptySalary = String(salary).length === 0;
    const hiringDate = date && date < nextBonusDate ? date : null;
    const aguinaldo = getAguinaldo(hiringDate ? salary : 0, hiringDate || now, periodo);

    e.preventDefault();

    if (emptySalary || hiringDate === null) {
      alert.classList.remove('hidden');
    }

    if (emptySalary) {
      salaryField.focus();
      return;
    }

    if (hiringDate === null) {
      dateField.focus();
      return;
    }

    result.innerHTML = aguinaldo.replace(/\$/g, '');
  }

  function onChange() {
    alert.classList.add('hidden');
  }

  function onChangePeriod() {
    const periodo = periodField.value;

    periodField.forEach(function eachPeriodField(field) {
      if (periodo === field.value) {
        iterateClassList(activePeriodClasses, field.parentElement, 'add');
        iterateClassList(inactivePeriodClasses, field.parentElement, 'remove');
      } else {
        iterateClassList(activePeriodClasses, field.parentElement, 'remove');
        iterateClassList(inactivePeriodClasses, field.parentElement, 'add');
      }
    });
  }

  const [today] = now.toISOString().split('T');
  dateField.max = today;
  iterateClassList(activePeriodClasses, periodField[0].parentElement, 'add');
  iterateClassList(inactivePeriodClasses, periodField[0].parentElement, 'remove');
  iterateClassList(inactivePeriodClasses, periodField[1].parentElement, 'add');

  form.addEventListener('submit', onSubmit);
  dateField.addEventListener('change', onChange);
  salaryField.addEventListener('change', onChange);
  submitBtn.addEventListener('click', onSubmit);
  periodField.forEach(function eachPeriodField(field) {
    field.addEventListener('change', onChangePeriod);
  });
}

document.addEventListener('DOMContentLoaded', initialize);

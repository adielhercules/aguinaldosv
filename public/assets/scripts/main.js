(function(global) { //eslint-disable-line
  function currency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  var now = new Date();
  var currentYear = now.getFullYear();

  function noOffsetDate(d) {
    return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
  }

  var nextBonusDate = noOffsetDate(new Date(`${currentYear}-12-12`));

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
    var days = 0;
    var oneDay = 1000 * 60 * 60 * 24;
    var noOfDays = Math.ceil((nextBonusDate.getTime() - hiringDate.getTime()) / oneDay);
    var numOfDaysInPeriod = getNumberOfDaysInPeriod(period);

    if (noOfDays <= 365) {
      days = 15 * ((noOfDays * 100) / 365 / 100);
    } else if (noOfDays > 365 && noOfDays < 365 * 3) {
      days = 15;
    } else if (noOfDays > 365 * 3 && noOfDays < 3650) {
      days = 19;
    } else if (noOfDays > 3650) {
      days = 21;
    }

    var dailySalary = salary / numOfDaysInPeriod;

    var aguinaldo = dailySalary * days;

    return currency(aguinaldo.toFixed(2));
  }

  function iterateClassList(classesArray, element, action) {
    classesArray.forEach(function addClassName(className) {
      element.classList[action](className);
    });
  }

  function initialize() {
    var form = global.document.getElementById('calculateAguinaldo');
    var salaryField = form.elements.salary;
    var dateField = form.elements.date;
    var periodField = form.elements.periodo;
    var alert = global.document.getElementById('alert-no-date');
    var submitBtn = global.document.getElementById('submitBtn');
    var result = global.document.getElementById('result');
    var activePeriodClasses = ['bg-green-700', 'hover:bg-green-600'];
    var inactivePeriodClasses = ['bg-xmas', 'hover:bg-green-900'];

    function onSubmit(e) {
      var salary = salaryField.value;
      var date = dateField.valueAsDate;
      var periodo = periodField.value;
      var emptySalary = String(salary).length === 0;
      var hiringDate = date && date < nextBonusDate ? date : null;
      var aguinaldo = getAguinaldo(hiringDate ? salary : 0, hiringDate || now, periodo);

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
      var periodo = periodField.value;

      periodField.forEach(function eachPeriodField(field) {
        iterateClassList(activePeriodClasses, field.parentElement, 'remove');
        iterateClassList(inactivePeriodClasses, field.parentElement, 'remove');
      });

      iterateClassList(
        activePeriodClasses,
        periodField[periodo === 'mensual' ? 0 : 1].parentElement,
        'add',
      );
    }

    dateField.max = now.toISOString().split('T')[0];
    iterateClassList(activePeriodClasses, periodField[0].parentElement, 'add');
    iterateClassList(inactivePeriodClasses, periodField[1].parentElement, 'add');

    form.addEventListener('submit', onSubmit);
    dateField.addEventListener('change', onChange);
    salaryField.addEventListener('change', onChange);
    submitBtn.addEventListener('click', onSubmit);
    periodField.forEach(function eachPeriodField(field) {
      field.addEventListener('change', onChangePeriod);
    });
  }

  global.document.addEventListener('DOMContentLoaded', initialize);
})(window); //eslint-disable-line

(function(global) { //eslint-disable-line
  function currency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  function noOffsetDate(d) {
    return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
  }

  const nextBonusDate = noOffsetDate(new Date(`${currentYear}-12-12`));

  function getAguinaldo(salary, hiringDate) {
    // Constants
    let days = 0;
    const oneDay = 1000 * 60 * 60 * 24;
    const noOfDays = Math.ceil((nextBonusDate.getTime() - hiringDate.getTime()) / oneDay);

    if (noOfDays <= 365) {
      const p = (noOfDays * 100) / 365 / 100;
      days = 15 * p;
    } else if (noOfDays > 365 && noOfDays < 365 * 3) {
      days = 15;
    } else if (noOfDays > 365 * 3 && noOfDays < 3650) {
      days = 19;
    } else if (noOfDays > 3650) {
      days = 21;
    }

    const dailySalary = salary / 30;

    const aguinaldo = dailySalary * days;

    return currency(aguinaldo.toFixed(2));
  }

  function initialize() {
    var form = global.document.getElementById('calculateAguinaldo');
    var salaryField = form.elements.salary;
    var dateField = form.elements.date;
    var alert = global.document.getElementById('alert-no-date');
    var submitBtn = global.document.getElementById('submitBtn');
    var result = global.document.getElementById('result');

    function onSubmit(e) {
      var salary = salaryField.value;
      var date = dateField.valueAsDate;
      var emptySalary = String(salary).length === 0;
      var hiringDate = date && date < nextBonusDate ? date : null;
      var aguinaldo = getAguinaldo(hiringDate ? salary : 0, hiringDate || now);

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

    dateField.max = now.toISOString().split('T')[0];

    form.addEventListener('submit', onSubmit);
    dateField.addEventListener('change', onChange);
    salaryField.addEventListener('change', onChange);
    submitBtn.addEventListener('click', onSubmit);
  }

  global.document.addEventListener('DOMContentLoaded', initialize);
})(window); //eslint-disable-line

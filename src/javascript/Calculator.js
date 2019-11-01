import { DAILY, FIXED, FIXED_MONTHLY, HOURLY } from './constants';
import BonusUtils from './BonusUtils';

export default class Calculator {
  static calculate({ type, ...restOfOptions }) {
    switch (type) {
      case FIXED:
        return this.calculateAsFixed(restOfOptions);
      case DAILY:
        return this.calculateAsDaily(restOfOptions);
      case HOURLY:
      default:
        return 0;
    }
  }

  static calculateAsFixed({ salary: inputSalary, time, period }) {
    const isMonthtly = period === FIXED_MONTHLY;
    const salary = isMonthtly ? inputSalary : inputSalary * 2;
    let bonus = 0.0;

    if (this.moreThanAYear(time)) {
      bonus = BonusUtils.getBonusPerMonth(salary, time);
    } else {
      bonus = BonusUtils.getPartialBonusPerMonth(salary, time);
    }

    const taxes = BonusUtils.getTaxes(salary, bonus);
    const total = bonus - taxes;

    return {
      taxes,
      total,
    };
  }

  static calculateAsDaily({ salary: inputSalary, time, missedDays }) {
    let dailyBonus = 0;

    if (this.moreThanAYear(time)) {
      dailyBonus = BonusUtils.getBonusPerDay(inputSalary, missedDays, time);
    } else {
      dailyBonus = BonusUtils.getPartialBonusPerDay(inputSalary, missedDays, time);
    }

    const taxes = BonusUtils.getTaxesPerDay(inputSalary, dailyBonus);
    const total = dailyBonus - taxes;

    return {
      taxes,
      total,
    };
  }

  static calculateAsHourly({
    salary: inputSalary,
    time,
    missedDays,
    hoursPerDay: inputHoursPerDay,
  }) {
    const hoursPerDay = isNaN(Number(inputHoursPerDay)) ? 0 : Number(inputHoursPerDay);
    let hourlyBonus = 0;

    if (this.moreThanAYear(time)) {
      hourlyBonus = BonusUtils.getBonusPerHour(inputSalary, hoursPerDay, missedDays, time);
    } else {
      hourlyBonus = BonusUtils.getPartialBonusPerHour(inputSalary, hoursPerDay, missedDays, time);
    }

    const taxes = BonusUtils.getTaxesPerHour(inputSalary, hoursPerDay, hourlyBonus);
    const total = hourlyBonus - taxes;

    return {
      total,
      taxes,
    };
  }

  static moreThanAYear(time) {
    return time > 12;
  }
}

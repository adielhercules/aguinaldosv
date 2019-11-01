import {
  FIRST_BLOCK,
  SECOND_BLOCK,
  THIRD_BLOCK,
  FIRST_FIX,
  SECOND_FIX,
  THIRD_FIX,
} from './constants';

export default class BonusUtils {
  static getBonusDaysPerYears(years) {
    if (years >= 1 && years < 3) {
      return 15;
    }

    if (years >= 3 && years < 10) {
      return 19;
    }

    if (years >= 10) {
      return 21;
    }

    return 15;
  }

  static getBonusPerMonth(salary, years) {
    return (salary / 30) * this.getBonusDaysPerYears(years);
  }

  static getBonusPerDay(salary, daysMissed, years) {
    return ((salary * (150 - daysMissed)) / 150) * this.getBonusDaysPerYears(years);
  }

  static getBonusPerHour(salary, hoursPerDay, daysMissed, years) {
    return ((salary * hoursPerDay * (150 - daysMissed)) / 150) * this.getBonusDaysPerYears(years);
  }

  static getPartialBonusPerMonth(salary, months) {
    return (this.getBonusPerMonth(salary, 1) * months) / 12;
  }

  static getPartialBonusPerDay(salary, daysMissed, months) {
    return (this.getBonusPerDay(salary, daysMissed, 1) * months) / 12;
  }

  static getPartialBonusPerHour(salary, hoursPerDay, daysMissed, months) {
    return (this.getBonusPerHour(salary, hoursPerDay, daysMissed, 1) * months) / 12;
  }

  static getTaxes(salary, bonus) {
    let bonusTaxes = 0;
    let generalTaxes = 0;

    if (bonus <= 503.4) {
      // Taxes does not apply
    } else {
      const surplus = bonus - 503.4;
      const salaryPlusBonus = salary + surplus;

      if (salaryPlusBonus > FIRST_BLOCK && salaryPlusBonus < SECOND_BLOCK) {
        generalTaxes = (salaryPlusBonus - FIRST_BLOCK) * 0.1 + FIRST_FIX;
        bonusTaxes = (surplus / salaryPlusBonus) * generalTaxes;
      } else if (salaryPlusBonus > SECOND_BLOCK && salaryPlusBonus < THIRD_BLOCK) {
        generalTaxes = (salaryPlusBonus - SECOND_BLOCK) * 0.2 + SECOND_FIX;
        bonusTaxes = (surplus / salaryPlusBonus) * generalTaxes;
      } else if (salaryPlusBonus > THIRD_BLOCK) {
        generalTaxes = (salaryPlusBonus - THIRD_BLOCK) * 0.3 + THIRD_FIX;
        bonusTaxes = (surplus / salaryPlusBonus) * generalTaxes;
      }
    }

    return bonusTaxes;
  }

  static getTaxesPerDay(salaryPerDay, bonus) {
    return this.getTaxes(salaryPerDay * 30, bonus);
  }

  static getTaxesPerHour(salaryPerHour, hoursPerDay, bonus) {
    return this.getTaxes(salaryPerHour * hoursPerDay * 30, bonus);
  }
}

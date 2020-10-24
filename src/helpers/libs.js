import AsyncStorage from '@react-native-community/async-storage';
import { resetRequest } from '../api/index';
import { numToMoneyString } from './thousandSeparator';
import moment from 'moment';

export const retrieveUserData = async () => {
  const storedUserData = await AsyncStorage.getItem('user_stats');
  return JSON.parse(storedUserData);
};

export const getRole = role => {
  let new_role = '';
  if (role === 'bizadmin') {
    new_role = 'Administrator';
  } else {
    new_role = 'Staff';
  }
  return new_role;
};

export const storeUserData = async data => {
  await AsyncStorage.setItem('user_stats', JSON.stringify(data));
  await resetRequest();
};

export const groupBy = (array, key) => {
  return array.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const chargeCalculator = inflow => {
  inflow = Number(inflow);
  let charge;
  if (inflow <= 100000) {
    charge = 0;
  }
  if (inflow > 100000 && inflow <= 500000) {
    charge = 3000;
  }
  if (inflow > 500000 && inflow <= 1000000) {
    charge = 5000;
  }
  return charge;
};

export const statementMonths = start_date => {
  var start_check = moment(start_date, 'YYYY/MM/DD');
  var end_check = moment();
  const result = [];
  while (start_check.isSameOrBefore(end_check)) {
    result.push({
      text: start_check.startOf('month').format('MMMM, YYYY'),
      navigateTo: start_check.startOf('month').format('YYYY-MM-DD'),
    });

    start_check.add(1, 'month');
  }

  return result;
};

export const totalChargeCalculator = (inflow, plan_charge) => {
  plan_charge = Number(plan_charge);
  let new_charge = chargeCalculator(inflow);
  return numToMoneyString(new_charge + plan_charge);
};

export const prepareSummaryData = flow => {
  const { inflow = '', outflow = '' } = flow;
  const diff = +inflow - +outflow;
  // if outflow is greater than inflow:
  let mark = '';
  if (diff < 0) {
    mark = '-';
  } else if (diff > 0) {
    mark = '+';
  }
  const difference = `${mark}${numToMoneyString(Math.abs(diff))}`;
  let moneyOutPercent = (outflow / inflow) * 100;
  if (diff < 0) {
    moneyOutPercent = 100;
  }

  return [
    {
      label: 'Money in',
      value: numToMoneyString(inflow),
      color: '#4CD964',
      percentageComplete: inflow === '' ? 0 : 100,
    },
    {
      label: 'Money out',
      value: numToMoneyString(outflow),
      color: '#FFCC00',
      percentageComplete: moneyOutPercent,
    },
    {
      label: 'Difference',
      value: difference,
      color: '#1B003B',
      percentageComplete: outflow === '' ? 0 : 100,
    },
  ];
};

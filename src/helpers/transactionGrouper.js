import moment from 'moment';

export const transactionGrouper = transaction => {
  let groupedTransactions = [];
  if (transaction) {
    transaction.forEach(data => {
      let transactionDate = moment(data.pub_date);
      let transactionDateFormatted = transactionDate.format('DD MMMM, YYYY');
      let isToday = moment().isSame(transactionDate, 'day');
      let isYesterday = moment()
        .subtract(1, 'day')
        .isSame(transactionDate, 'day');
      if (isToday) {
        let todayExits = false;
        //check if there is today slot
        for (let i = 0, len = groupedTransactions.length; i < len; i++) {
          if (groupedTransactions[i].day === 'Today') {
            todayExits = true;
            //insert transaction
            groupedTransactions[i].transactions.push(data);
            // //console.log(groupedTransactions, 'SISTER>>>>>');
            break;
          } else {
            continue;
          }
        }
        if (!todayExits) {
          //create today slot
          let day = {
            day: 'Today',
            transactions: [data],
          };
          groupedTransactions.push(day);
        }
      } else if (isYesterday) {
        // //console.log(groupedTransactions, 'SISTER>>>>>');
        let yesterdayExits = false;
        //check if there is today slot
        for (let i = 0, len = groupedTransactions.length; i < len; i++) {
          if (groupedTransactions[i].day === 'Yesterday') {
            yesterdayExits = true;
            //insert transaction
            groupedTransactions[i].transactions.push(data);
            break;
          } else {
            continue;
          }
        }
        if (!yesterdayExits) {
          //create today slot
          let day = {
            day: 'Yesterday',
            transactions: [data],
          };
          groupedTransactions.push(day);
        }
      } else {
        // //console.log(groupedTransactions, 'SISTER>>>>>');
        let dayExits = false;
        //check if there is today slot
        for (let i = 0, len = groupedTransactions.length; i < len; i++) {
          if (groupedTransactions[i].day === transactionDateFormatted) {
            dayExits = true;
            //insert transaction
            groupedTransactions[i].transactions.push(data);
            break;
          } else {
            continue;
          }
        }
        if (!dayExits) {
          //create today slot
          let day = {
            day: transactionDateFormatted,
            transactions: [data],
          };
          groupedTransactions.push(day);
        }
      }
      return groupedTransactions;
    });
    // return groupedTransactions;
  }
};

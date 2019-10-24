import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';
import RemovalMonthModel from '../models/RemovalMonthModel';

class RemovalMonthService {
  async getMonths(year) {    
    const params = {
      dateDebut: year + '-01-01',
      dateFin: year + '-12-31',
    }

    
    //const response = await ApiMiddleware.postData(ANCHOR.REMOVAL_MONTH, {dateDebut: '1990-01-01', dateFin: new Date().toJSON().substr(0,10)});
    const response = await ApiMiddleware.postData(ANCHOR.REMOVAL_MONTH, params);

    const months = this.createThisYearArray(year);
    response.body.forEach(item => {
      const currentMonth = months.find(m => (m.month === item.month && m.year === item.year));
      if (currentMonth) {
        currentMonth.weight = Math.round(item.poids);
      }
    });
    //console.log(months);
    return months;
  }

  createThisYearArray(year) {
    //const currentYear = year;
    const months = [];
    for(let i = 1; i < 13; i++) {
      months.push(new RemovalMonthModel(i, year, 0));
    }
    return months;
  }

}

export default new RemovalMonthService();

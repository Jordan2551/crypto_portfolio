import axios from 'axios';
import { Alert } from 'react-native';
import { API_ROOT } from './constants';

export const getPortfolios = async () => {
    try{
        const result = await axios.get(`${API_ROOT}/protfolios/`);
        return result.data;
    }catch(error){
        console.error(error);
    }
}

export const getPortfolioValue = (portfolioData, priceData) => {
    let total = 0.0;
    portfolioData.forEach(portfolio => {
        const price = priceData.find(price => portfolio.coin === price.ticker); 
        if(price)
            total += (price.stats.price) * parseFloat(portfolio.amount);
    });
    return roundNumber(total);
};

export const savePortfolio = async (ticker, amount) => {
    try{
        console.log("HERE",ticker, amount);
        const result = await axios.put(`${API_ROOT}/protfolios/${ticker}/`, {amount});

        Alert.alert('Portfolio Update', `Your portfolio for ${ticker} has been updated!`);

    }catch(error){
        console.error(error);
    }
}

export const roundNumber = (number) => {
    return parseFloat(number).toFixed(2);
}
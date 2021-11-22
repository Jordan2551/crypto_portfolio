import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { getCoins } from '../../apiHelpers/coinHelper';
import { getPortfolios, getPortfolioValue } from '../../apiHelpers/portfolioHelper';
import CoinPortfolio from '../Coin/CoinPortfolio';

const Portfolio = ({navigation}) => {
  const [priceData, setPriceData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getCoinData(){
      const data = await getCoins();
      setPriceData(data);
      setLoaded(true);
    }
    getCoinData();
  }, []);

  useEffect(() => {
    async function getPortfolioData(){
      const data = await getPortfolios();
      setPortfolioData(data);
    }
    getPortfolioData();
  }, [])

  const getCoinAmount = (ticker) => {
    let coin = portfolioData.find(portfolio => portfolio.coin === ticker);
    if(coin)
      return coin.amount;
    return "0.00";
  }

  return(
      loaded ? 
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Prices are displayed daily</Text>
              <Text style={styles.title}>Portfolio Value: ${getPortfolioValue(portfolioData, priceData)}</Text>
            </View>
            <FlatList
              data={portfolioData}
              renderItem={({item}) => 
              <CoinPortfolio 
                coinAmount={getCoinAmount(item.coin)} 
                coin={priceData.find(data => data.ticker === item.coin)}
                navigation={navigation}
              /> 
            }
            />
          </View>
      :
      <Text>Loading...</Text>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
  },
  titleContainer: {
    textAlign: 'center',
    padding: 10
  },
  title: {
    textAlign: 'center'
  }
});

export default Portfolio;

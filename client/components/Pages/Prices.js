import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { getCoins } from '../../apiHelpers/coinHelper';
import CoinStats from '../Coin/CoinStats';


const Prices = () => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    async function getData(){
      const data = await getCoins();
      setPriceData(data);
    }
    getData();
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Prices are displayed daily</Text>
      <FlatList
        data={priceData}
        renderItem={({item}) => <CoinStats coin={item} /> }
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    padding: 10
  }
});

export default Prices;

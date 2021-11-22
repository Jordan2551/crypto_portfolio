import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Touchable, Alert } from 'react-native';
import CoinStats from './CoinStats';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from '../Input/TextInput';
import { savePortfolio } from '../../apiHelpers/portfolioHelper';

const CoinPortfolio = ({coinAmount, coin, navigation}) => {
    const [amount, changeAmount] = useState(coinAmount);
    const handleSaveProtfolio = async () => {
        if(Number.isInteger(amount) && parseInt(amount) < 0)
            Alert.alert('Negative Amount', 'Amount must be non-negative');
        else{
            await savePortfolio(coin.ticker, amount);
            navigation.navigate('Home');
        }
    }

    return(
        <View>
            <CoinStats coin={coin} />
            <View style={styles.container}>
                <CustomTextInput placeholder="Amount" label="Amount:" value={amount} onChangeText={changeAmount} />
                <TouchableOpacity>
                    <Icon name="save" size={25} color="darkslateblue" onPress={handleSaveProtfolio} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default CoinPortfolio;
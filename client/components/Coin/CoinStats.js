import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { roundNumber } from '../../apiHelpers/portfolioHelper';

const CoinStats = ({coin}) => {
    const {ticker, name, stats} = coin;
    const {price, price_change_pct} = stats;

    const priceChangeStr = price_change_pct >= 0 ? '+' + roundNumber(price_change_pct, 2) + '%' : roundNumber(price_change_pct, 2) + '%'; 

    return(
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <Image source={{uri: coin.image}} style={styles.img}/>
                <View>
                    <Text style={styles.listItemText}>{ticker}</Text>
                    <Text style={styles.listItemText}>{name}</Text>
                </View>
                <View>
                    <Text style={styles.listItemText}>{'$' + roundNumber(price, 2)}</Text>
                    <Text style={styles.listItemText}>{priceChangeStr}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#2F4F4F',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemText: {
        color: '#ffff',
        fontSize: 13
    },
    img: {
        width: 30,
        height: 30,
    }
});

export default CoinStats;
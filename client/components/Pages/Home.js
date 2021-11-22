import { Link } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';


const Home = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <Text>Welcome to Crypto Portfolio. Select an option to get started</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Prices"
          onPress={() => navigation.navigate('Prices')}
        />
        <Button
          title="Portfolio"
          onPress={() => navigation.navigate('Portfolio')}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  title: {
      fontSize: 18,
      color: '#ffff',
  }
});

export default Home;

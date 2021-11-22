import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';


const Login = () => {
  return(
    <View style={styles.container}>
      <Text>LOGIN (WIP)</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: {
      fontSize: 30,
      color: '#ffff',
  }
});

export default Login;

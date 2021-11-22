import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const CustomTextInput = ({placeholder, value, label, onChangeText}) => {
    return(
        <View style={styles.container}>
            <Text>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        marginLeft: 10
    }
});

export default CustomTextInput;
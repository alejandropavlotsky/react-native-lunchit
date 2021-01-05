import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default ({navigation}) => {

    useEffect(() => {
        AsyncStorage.getItem('token')
        .then(x => {
            navigation.navigate(x ? 'Root' : 'Onboarding')
        })
    }, []);

    return (
        <View>
            <ActivityIndicator />
        </View>
    )
}
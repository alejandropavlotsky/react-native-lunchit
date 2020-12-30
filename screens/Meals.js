import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff', alignItems: 'flex-start', justifyContent: 'flex-start'},
    list: {alignSelf: 'stretch'},
})

const Meals = ({navigation}) => {

    const [loading, setLoading] = useState(true)
    const [meals, setMeals] = useState([])

    const fetchMeals = async() => {
        const response = await fetch('https://serverless.alejandropavlotsky.vercel.app/api/meals')
        const data =  await response.json()
        setMeals(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchMeals()
    }, [])

    return (
        <View style={styles.container}>
        {
            loading ? <Text>Cargando...</Text> : 

            <FlatList
                style={styles.list}
                data={meals}
                keyExtractor={x => x._id}
                renderItem={({item}) => <ListItem
                    onPress={() => navigation.navigate('Modal', {_id: item._id})}
                    name={item.name}
                />}
            />
        }
        </View>
    )
}

Meals.navigationOptions = ({
    title: 'Comidas disponibles'
})

export default Meals
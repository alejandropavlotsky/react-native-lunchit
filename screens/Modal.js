import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default ({navigation}) => {

    const [loading, setLoading] = useState(true)
    const [meals, setMeals] = useState([])
    const id = navigation.getParam('_id')

    const fetchMeals = async() => {
        const response = await fetch(`https://serverless.alejandropavlotsky.vercel.app/api/meals/${id}`)
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
                loading 
                ? 
                <Text>Cargando...</Text> 
                : 
                <>
                    <Text>{meals._id}</Text>
                    <Text>{meals.name}</Text>
                    <Text>{meals.description}</Text>
                    <Button title="Aceptar" onPress={() => {
                        fetch('https://serverless.alejandropavlotsky.vercel.app/api/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                meal_id: id,
                                user_id: 'lalala',
                            })
                        }).then(() => {
                            alert('Orden generada con éxito')
                            navigation.navigate('Meals')
                        })
                    }}/>
                    <Button title="Cancelar" onPress={() => navigation.navigate('Meals')}/>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
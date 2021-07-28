import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const CoinItem = ({coin}) => { //el coin es el prop que lo mandamos desde app como 'coin'
    return (
        <View style={styles.containerItem}>
            <View style={styles.CoinNames}>
                <Image style={styles.image} source={{uri: coin.image}}/>
                    <View style={styles.CointairnerNames}>
                        <Text style={styles.text}>{coin.name}</Text>
                        <Text style={styles.TextSymbol}>{coin.symbol}</Text>   
                    </View>
            </View>
            <View>
                <Text style={styles.textPrice}>${coin.current_price}</Text>
                <Text 
                    style={[
                    styles.pricePercentage,
                    coin.price_change_percentage_24h > 0 
                        ? styles.priceUp
                        : styles.priceDown
                        ]}
                        >
                        {coin.price_change_percentage_24h}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: '#141414',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CoinNames: {
        flexDirection: 'row'
    },
    CointairnerNames: {
        marginLeft: 10,
    },
    text: {
        color: '#fff',
        fontSize: 17
    },
    textPrice: {
        color: '#fff',
        textAlign: 'right'
    },
    image: {
        width: 30,
        height: 30
    },
    TextSymbol: {
        color: '#434343',
        textTransform: 'uppercase' //para que me lo ponga en mayuscula
    },
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: '#086A08',
    },
    priceDown: {
        color: '#FC4422'
    }
})

export default CoinItem

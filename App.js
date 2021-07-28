import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, Status, StatusBar } from 'react-native'

import CoinItem from './Components/CoinItem'

export default function App() {

  const [coins, setcoins] = useState([])
  const [search, setsearch] = useState('')
  const [refreshing, setrefreshing] = useState(false)

  const LoadData = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false');

    const data = await res.json();
    setcoins(data);
  }

  useEffect(() => {
    LoadData();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'grey'}/> 
      <View style={styles.header}>
        <Text style={styles.text}>Mercado de Monedas</Text>
        <TextInput style={styles.SearchInput}
          placeholder= 'Buscar Moneda'
          placeholderTextColor= 'white'
          onChangeText={text => setsearch(text)}
        />   
      </View>
        <FlatList style={styles.list}
          data = {coins.filter(
            (coin) =>
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
          )}
          renderItem = {({item}) => {
            return <CoinItem coin={item}/>
          }}
          showsVerticalScrollIndicator = {false} //para quitar el scroll 
          refreshing={refreshing}
          onRefresh = {async() => {
            setrefreshing(true)
            await LoadData()
            setrefreshing(false)
          }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },
  list: {
    width: '95%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%'
  },
  SearchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '30%',
    textAlign: 'center'
  }
})
import React from 'react'
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header() { 
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
           <Image source={require('../../../assets/images/logo.png')} 
           style={styles.logoImg}/>

           <FontAwesome name="filter" size={26} color="black" />
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
  logoImg:{
    width: 80,
    height: 70,
  }
})

import React from 'react'
import { Image, Text, View, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import  Colors  from '../../Utils/Colors'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
        <Image source={require('../../../assets/images/character.png')}
        style={styles.img}/>
        </View>
        <Text style={styles.name}>Taleeha Tahoor</Text>
        <Text style={styles.role}>React Native Developer</Text>
      </View>

      <View style={{display: 'flex', marginHorizontal: 20, marginTop: 10}}>
        
        <View style={styles.dataContainer}>
        <Text style={styles.data}>Email</Text>
        <Text style={styles.input}>taleeha@gmail.com</Text>
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.data}>Phone</Text>
        <Text style={styles.input}>92134556780</Text>
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.data}>Website</Text>
        <Text style={styles.input}>www.taleehatahoor.com</Text>
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.data}>Password</Text>
        <Text style={styles.input}>*************</Text>
        </View>

      </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  imgContainer: {
    // backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
    padding: 15

  },
  img:{
    width: 154, 
    height: 140

  },
  name:{
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY

  },
  role: {
    fontSize: 17,
    color: Colors.GRAY,
    fontFamily: 'outfit'
  },
  dataContainer: {
    // display: 'flex',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start'
    marginTop: 15
  },
  data:{
    fontSize: 17,
    color: Colors.BLACK,
    fontFamily: 'outfit-medium'

  },
  input:{
    fontSize: 19,
    fontFamily: "outfit",
    backgroundColor: "#f1f2f0",
    padding: 15,
    borderRadius: 13,
    // paddingHorizontal: 80,
    color: Colors.GRAY
  }

})

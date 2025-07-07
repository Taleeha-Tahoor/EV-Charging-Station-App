import React, { useContext, useEffect, useRef } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import { EVStationsData } from '../../Utils/Data'
import Colors from '../../Utils/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function PlaceListView() {
  const flatListRef = useRef(null);
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);

  useEffect(() => {
    scrollToIndex(selectedMarker)
  }, [selectedMarker])
  
  const scrollToIndex=(index)=>{ 
    flatListRef.current?.scrollToIndex({animated: true, index})
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width*index,
    index
  });

  return (
    <View >
      <FlatList
        data={EVStationsData}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.container} >
            <LinearGradient
              colors={['transparent', '#ffffff', '#ffffff']}>
              <Image source={{ uri: item.image }} style={styles.img} />

              <View style={{ padding: 10, }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.address}>{item.address}</Text>

                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View >
                    <Text style={[styles.address, { fontSize: 17 }]}>Connectors</Text>
                    <Text style={styles.points}>{item.points}</Text>
                  </View>

                  <View style={styles.btnContainer}>
                    <FontAwesome name="location-arrow" size={25} color="white" />
                  </View>
                </View>
              </View>

            </LinearGradient>
          </View>
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.8,
    margin: 5,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    zIndex: -1
  },
  title: {
    fontSize: 21,
    fontFamily: 'outfit-medium'
  },
  address: {
    color: Colors.GRAY,
    fontFamily: 'outfit'
  },
  points: {
    fontFamily: 'outfit-medium',
    fontSize: 17,
    marginTop: 2,
  },
  btnContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 14
  }
})

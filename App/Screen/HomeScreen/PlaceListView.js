import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Dimensions, Pressable, TouchableOpacity, Linking } from 'react-native'
import { EVStationsData } from '../../Utils/Data'
import Colors from '../../Utils/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlaceListView({customData, horizontalView = true}) {

  const dataToShow = customData || EVStationsData;
  
  const flatListRef = useRef(null);
  // const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const [favorites, setFavorites] = useState([]);

  const context = useContext(SelectMarkerContext);
const selectedMarker = context?.selectedMarker;
const setSelectedMarker = context?.setSelectedMarker;


  useEffect(() => {
    if (selectedMarker !== undefined) {
    scrollToIndex(selectedMarker);

  }}, [selectedMarker])

  useEffect(() => {
    loadFav();
  }, []);

  const loadFav = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  }

  const toggleFav = async (station) => {
    const stored = await AsyncStorage.getItem('favorites');
    let favs = stored ? JSON.parse(stored) : [];

    const exists = favs.some(fav => fav.id === station.id);
    if (exists) {
      favs = favs.filter(fav => fav.id !== station.id);
    } else {
      favs.push(station)
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favs));
    setFavorites(favs)
  };

  const isFav = (id) => {
    return favorites.some(fav => fav.id == id)
  }

  const openInMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  }
  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index })
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index
  });

  return (
    <View >
      <FlatList
        data={dataToShow}
        horizontal={horizontalView}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.container} >
            <LinearGradient
              colors={['transparent', '#ffffff', '#ffffff']}>

              <Pressable style={{ position: 'absolute', right: 0, margin: 5 }} onPress={() => toggleFav(item)}>
                <FontAwesome name={isFav(item.id) ? 'heart' : 'heart-o'}
                  size={30}
                  color={isFav(item.id) ? "red" : "white"} />
              </Pressable>

              <Image source={{ uri: item.image }} style={styles.img} />

              <View style={{ padding: 10, }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.address}>{item.address}</Text>

                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View >
                    <Text style={[styles.address, { fontSize: 17 }]}>Connectors</Text>
                    <Text style={styles.points}>{item.points}</Text>
                  </View>

                  <TouchableOpacity style={styles.btnContainer} onPress={() => openInMaps(item.latitude, item.longitude)}>
                    <FontAwesome name="location-arrow" size={25} color="white" />
                  </TouchableOpacity>
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
    width: Dimensions.get('screen').width * 0.95,
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

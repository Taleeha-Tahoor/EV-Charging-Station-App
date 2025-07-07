import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlaceListView from '../HomeScreen/PlaceListView';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        setFavorites(stored ? JSON.parse(stored) : []);
      } catch (err) {
        console.log('Error loading favorites:', err);
      }
    };

    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <Text style={styles.noFav}>No favorites added yet ❤️</Text>
        ) : (
          <PlaceListView customData={favorites} horizontalView={false} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  noFav: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: 'gray',
    fontFamily: 'outfit-medium',
  },
});

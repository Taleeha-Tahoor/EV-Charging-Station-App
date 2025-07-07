import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import Colors from '../../Utils/Colors'
import Header from './Header'
import SearchBar from './SearchBar'
import { useRef } from 'react';
import PlaceListView from './PlaceListView'
import Markers from './Markers'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function HomeScreen() {

    const [location, setLocation] = useState(null)
    const [error, setError] = useState("");
    const mapRef = useRef(null);
    const [selectedMarker, setSelectedMarker] = useState([])

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
                setError("Permission to access location is denied");
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            const initialLocation = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            }
            setLocation(initialLocation)

        }

        getCurrentLocation()
    }, [])

    if (!location) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        )
    }

    return (
        <SelectMarkerContext.Provider value={{selectedMarker, setSelectedMarker}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'none' }}>
                <View style={styles.headerContainer}>
                    <Header />
                    <SearchBar onPlaceSelected={(loc) => {
                        const newLoc = {
                            latitude: loc.lat,
                            longitude: loc.lng,
                        };
                        setLocation(newLoc);

                        mapRef.current.animateToRegion({
                            ...newLoc,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }, 1000);
                    }} />
                </View>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>
                    <Marker coordinate={location}
                        draggable
                    >
                        <Image source={require('../../../assets/images/car-marker.png')}
                            style={{ width: 30, height: 40, }} />
                    </Marker>

                    <Markers />
                </MapView>

                <View style={styles.placeListContainer}>
                    <PlaceListView/>
                </View>
            </SafeAreaView>
        </SelectMarkerContext.Provider>
    )

}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
    },
    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        // padding: 8,
        // paddingVertical: 8,
        width: '100%',
        backgroundColor: Colors.TRANSPARENT,
        marginVertical: 40
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeListContainer: {
        position: 'absolute',
        bottom: 10,
        zIndex: 10,
        width: '100%',
        backgroundColor: Colors.WHITE
    }
});
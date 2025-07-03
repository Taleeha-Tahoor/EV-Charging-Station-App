import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import Colors from '../../Utils/Colors'
import Header from './Header'

export default function HomeScreen() {

    const [location, setLocation] = useState(null)
    const [error, setError] = useState("");

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
        return <ActivityIndicator size="large" color={Colors.PRIMARY} />
    }

    return (
        <>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'none'}}>
            <View style={styles.headerContainer}>
                <Header/>
            </View>
            <MapView style={styles.map}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Marker coordinate={location}
                    draggable
                >
                    <Image source={require('../../../assets/images/car-marker.png')}
                    style={{width: 30, height: 40,}} />
                </Marker>

            </MapView>
        </SafeAreaView>
        </>
    )

}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
    },
    // headerContainer:{
    //     position: 'absolute',
    //     zIndex: 10,
    //     padding: 10,
    //     paddingVertical: 20,
    //     width: '100%',
    //     backgroundColor: Colors.TRANSPARENT,
        
    // }
});
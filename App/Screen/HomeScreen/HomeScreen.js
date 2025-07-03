import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import Colors from '../../Utils/Colors'

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <MapView style={styles.map}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Marker coordinate={location}
                    draggable
                />

            </MapView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
    },
});
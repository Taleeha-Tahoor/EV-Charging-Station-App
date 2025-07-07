import React, { useContext } from 'react'
import { View, Image } from 'react-native'
import { EVStationsData } from '../../Utils/Data'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers() {
    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

    return (
        <View>
            {EVStationsData.map((item, index) => (
                <Marker
                    key={item.id}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }}
                    // index={index}
                    onPress={() => setSelectedMarker(item.id)}
                >
                    <Image source={require('../../../assets/images/ev-marker.png')}
                        style={{ width: 30, height: 35, }}
                    />
                </Marker>
            ))}

        </View>
    )
}
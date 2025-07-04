import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const API_KEY = 'AlzaSyTM4iHxr5SebcaQQ8bUyTNCqyH43C_Voqd'

export default function SearchBar({onPlaceSelected}) {

    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = async (text) => {
        setSearchText(text);
        if (text < 2) {
            setSuggestions([]);
            return;
        }

        const response = await fetch(
            `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${text}&key=${API_KEY}&language=en`
        );
        const json = await response.json();
        setSuggestions(json.predictions || []);
    };


    const handleSelect = async (placeId) => {
        const res = await fetch(
            `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`
        );
        const data = await res.json();
        const location = data.result.geometry.location;

        setSuggestions([]);
        setSearchText(data.result.name);
        onPlaceSelected(location);
        
    };

    return (
        <>
            <View style={styles.container}>
                <Ionicons name="location-sharp" size={24} color={Colors.GRAY} />
                <TextInput
                    style={styles.input}
                    placeholder='Search EV Stations'
                    value={searchText}
                    onChangeText={handleSearch}
                    
                />
            </View>

            <FlatList
                data={suggestions}
                style={styles.list}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleSelect(item.place_id)}
                    >
                        <Text>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        width: '90%',
        paddingLeft: 10,
        marginLeft: 20
    },
    item: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    list: {
        backgroundColor: Colors.WHITE,
        width: '90%',
        paddingLeft: 10,
        marginLeft: 20
    }
})

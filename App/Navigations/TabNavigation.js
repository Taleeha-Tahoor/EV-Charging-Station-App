import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen'
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../Utils/Colors';

export default function TabNavigation() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY,
        }}>
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" size={size} color={color}/>
                )
            }} />
            <Tab.Screen name="favorite" component={FavoriteScreen} options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="heart" size={size} color={color}/>
                )
            }}/>
            <Tab.Screen name="profile" component={ProfileScreen} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-circle" size={size} color={color}/>
                )
            }} />

        </Tab.Navigator>
    )

}

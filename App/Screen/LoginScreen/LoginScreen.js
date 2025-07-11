import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../Utils/Colors';
import { auth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    const navigation = useNavigation();

    // const handleGoogleSignIn = async () => {
    //     try {
    //         const { createdSessionId, setActive } = await auth().startOAuthFlow({
    //             strategy: 'oauth_google',
    //         });

    //         if (createdSessionId) {
    //             await setActive({ session: createdSessionId });
    //             console.log('✅ Signed in successfully');
    //         }
    //     } catch (err) {
    //         console.log('❌ Google Sign-in failed:', err);
    //     }
    // };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
            <Image source={require('../../../assets/images/logo2.jpg')}
                style={styles.logoImage} />
            <Image source={require('../../../assets/images/ev-chargingg.jpg')}
                style={styles.bgImage} />

            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.heading}>Your Ultimate EV charging Station Finder</Text>
                <Text style={styles.desc}>Find EV charging station near you, plan trip and much more in just one click</Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Main')}>
                <Text style={styles.btnText}>Lets Find</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
    },
    logoImage: {
        width: 250,
        height: 90,
        objectFit: 'contain'
    },
    bgImage: {
        width: '100%',
        height: 300,
        objectFit: 'contain',
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    desc: {
        fontSize: 17,
        fontFamily: 'outfit',
        textAlign: 'center',
        marginTop: 15,
        color: Colors.GRAY
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        display: 'flex',
        borderRadius: 99,
        marginTop: 50,
        width: 300
    },
    btnText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 18,
    },

})

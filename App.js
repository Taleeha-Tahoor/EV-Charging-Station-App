import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-ExtraBold.ttf'),

  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={'pk_test_YmVjb21pbmctbXVsbGV0LTU1LmNsZXJrLmFjY291bnRzLmRldiQ'}
      tokenCache={tokenCache}>
      <View style={styles.container}>
        <SignedIn>
          <Text>You are Signed-in</Text>
        </SignedIn>

        <SignedOut>
          <LoginScreen />
        </SignedOut>

      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40

  },
});

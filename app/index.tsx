import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, View, Dimensions, StyleSheet } from 'react-native';
import '../global.css';
const SplashScreen = () => {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        if (userData?.token) {
          setTimeout(() => {
            router.replace('/navigation/drawer');
          }, 2000);
        } else {
          setTimeout(() => {
            router.replace('/screens/auth/LoginScreen');
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setTimeout(() => {
          router.replace('/screens/auth/LoginScreen');
        }, 2000);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')}
        style={[styles.image, { width: width * 0.5, height: width * 0.5 }]}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    marginBottom: 24,
  },
});

export default SplashScreen;

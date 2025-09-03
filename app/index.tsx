import { useEffect } from 'react';
import { ActivityIndicator, Image, View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token && typeof token === 'string' && token.trim() !== '') {
          setTimeout(() => {
            router.replace('/navigation/drawer');
          }, 2000);
        } else {
          setTimeout(() => {
            router.replace('/screens/auth/OnboardingScreen');
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
  }, [router]);

  return (
    <View className="flex-1 bg-white justify-center items-center px-5">
      <Image
        source={require('../assets/images/icon.png')}
        style={{ width: width * 0.7, height: width * 0.7 }}
        className="mb-6"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#1877F2" />
    </View>
  );
};

export default SplashScreen;

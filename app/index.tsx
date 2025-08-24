import React from "react";
import { useEffect } from 'react';
import { ActivityIndicator, Image, View, Dimensions, StyleSheet } from 'react-native';
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

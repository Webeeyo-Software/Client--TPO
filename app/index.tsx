import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import '../global.css'
const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        setTimeout(() => {
          router.replace("/navigation/drawer");
        }, 2000);
      } catch (error) {
        console.error("Error checking login status:", error);
        router.replace("/navigation/drawer");
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center px-5">
      <Image
        source={require("../assets/images/icon.png")}
        className="w-48 h-48 mb-6"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default SplashScreen;

import React from "react";
import { Image, View } from "react-native";

const OnboardingImage = () => {
  return (
    <View className="w-full items-center mt-10">
      <Image
        source={require("../../assets/images/icon.png")}
        resizeMode="contain"
        className="w-72 h-72"
      />
    </View>
  );
};

export default OnboardingImage;

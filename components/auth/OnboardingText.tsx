import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
  description: string;
}

const OnboardingText: React.FC<Props> = ({ title, description }) => {
  return (
    <View className="px-6 mt-6">
      <Text className="text-xl font-bold text-center text-black">
        {title}
      </Text>
      <Text className="text-sm text-center text-gray-500 mt-2 leading-5">
        {description}
      </Text>
    </View>
  );
};

export default OnboardingText;

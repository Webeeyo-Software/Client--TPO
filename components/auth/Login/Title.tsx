import React from "react";
import { Text, View } from "react-native";

interface TitleProps {}

const Title: React.FC<TitleProps> = () => {
  return (
    <View className="mb-6">
      <Text className="text-7xl font-bold text-black leading-tight">
        Empower{'\n'}Your Skills
      </Text>
      <Text className="text-7xl font-bold text-[#1877F2] leading-tight">
        Explore Top{'\n'}Placements
      </Text>
    </View>
  );
};

export default Title;

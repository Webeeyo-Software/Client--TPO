import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

type CompanyCardProps = {
  logo: any;
  name: string;
  type: string;
  onPress?: () => void;
};


export const CompanyCard: React.FC<CompanyCardProps> = ({ logo, name, type, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-3 h-24 shadow-md"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image source={logo} className="w-5 h-5 resize-contain mr-4" />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{name}</Text>
        <Text className="text-xs text-gray-500">{type}</Text>
      </View>
    </TouchableOpacity>
  );
};

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type CompanyCardProps = {
  logo: any;
  name: string;
  type: string;
  onPress?: () => void;
};

export const CompanyCard: React.FC<CompanyCardProps> = ({ logo, name, type, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-3 shadow-md h-24"
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Logo */}
      <View className="w-12 h-12 justify-center items-center mr-4">
        <Image
          source={logo}
          className="w-12 h-12"
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">{name}</Text>
        <Text className="text-base text-gray-500 mt-0.5">{type}</Text>
      </View>

      {/* Right Arrow */}
      <AntDesign name="right" size={18} color="#6B7280" />
    </TouchableOpacity>
  );
};

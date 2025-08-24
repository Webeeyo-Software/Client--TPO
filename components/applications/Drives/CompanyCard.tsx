import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type CompanyCardProps = {
  logo?: ImageSourcePropType;
  name: string;
  type: string;
  onPress?: () => void;
};

export const CompanyCard: React.FC<CompanyCardProps> = ({
  logo,
  name,
  type,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="h-30 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5"
    >
      <View className="w-20 h-20 rounded-xl justify-center items-center mr-4">
        {logo ? (
          <Image
            source={logo}
            className="w-20 h-20"
            resizeMode="contain"
          />
        ) : (
          <AntDesign name="bank" size={28} color="#9CA3AF" />
        )}
      </View>

      <View className="flex-1">
        <Text
          className="text-base font-semibold text-gray-900"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="text-sm text-gray-500 mt-0.5"
          numberOfLines={1}
        >
          {type}
        </Text>
      </View>

      <AntDesign name="right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

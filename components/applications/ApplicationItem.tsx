import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type ApplicationItemProps = {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export default function ApplicationItem({
  icon,
  title,
  subtitle,
  onPress,
}: ApplicationItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`h-30 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5`}>
      <View className="flex-row items-center space-x-4 gap-6">
        <Image source={icon} className="h-14 w-14" resizeMode="contain" />
        <View>
          <Text className="text-base font-semibold text-black">{title}</Text>
          <Text className="text-sm text-gray-400">{subtitle}</Text>
        </View>
      </View>
      <AntDesign name="right" size={18} color="black" />
    </TouchableOpacity>
  );
}

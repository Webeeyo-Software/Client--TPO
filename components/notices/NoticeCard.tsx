import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  description: string;
  logo?: any;
  onPress?: () => void;
};

export default function NoticeCard({ title, description, logo, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-40 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
    >
      <View className="flex-1 pr-3">
        <Text className="text-l font-semibold text-gray-900 w-44">{title}</Text>
        <Text className="mt-3 w-48 text-sm text-gray-500">{description}</Text>
      </View>

      {logo ? (
        <Image source={logo} resizeMode="contain" className="mr-3 h-14 w-20" />
      ) : (
        <View className="mr-3 flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
          <Ionicons name="megaphone-outline" size={22} color="#6B7280" />
        </View>
      )}
    </TouchableOpacity>
  );
}

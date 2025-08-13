import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TpoCardProps {
  title: string;
  year: string;
  onDelete: () => void;
}

const TpoCard: React.FC<TpoCardProps> = ({ title, year, onDelete }) => {
  return (
    <View className="border border-[#ccc] rounded-lg overflow-hidden mb-8 h-100 w-100 mx-7">
      <View className="bg-[#1877F2] p-3 flex flex-row justify-between items-baseline h-14">
        <Text className="text-white font-semibold text-base">{title}</Text>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="bg-white p-3 flex flex-row justify-between h-14 items-baseline">
        <Text className="font-semibold">Academic Year</Text>
        <Text className="text-black">{year}</Text>
      </View>
    </View>
  );
};

export default TpoCard;

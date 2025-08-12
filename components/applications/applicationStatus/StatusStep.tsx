import React from "react";
import { View, Text } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type StatusStepProps = {
  icon: "file-text" | "search" | "calendar-today";
  title: string;
  date: string;
};

const iconsMap = {
  "file-text": <Feather name="file-text" size={20} color="#4B5563" />,
  search: <Feather name="search" size={20} color="#4B5563" />,
  "calendar-today": (
    <MaterialIcons name="calendar-today" size={20} color="#4B5563" />
  ),
};



export const StatusStep: React.FC<StatusStepProps> = ({ icon, title, date }) => {
  return (
    <View className="flex-row items-start space-x-3 gap-3">
      <View className="mt-1">{iconsMap[icon]}</View>
      <View>
        <Text className="text-gray-800 font-semibold">{title}</Text>
        <Text className="text-blue-500 mt-0.5">{date}</Text>
      </View>
    </View>
  );
};

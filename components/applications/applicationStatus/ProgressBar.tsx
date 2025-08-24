import React from "react";
import { View } from "react-native";

type ProgressBarProps = {
  progress: number; 
};


export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <View
        className="h-full bg-[#1877F2]"
        style={{ width: `${progress}%` }}
      />
    </View>
  );
};

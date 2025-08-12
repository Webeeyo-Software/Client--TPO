import React from "react";
import { View } from "react-native";

interface DividerProps {
  className?: string; 
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <View className={`h-[1px] bg-gray-300 my-3 ${className || ""}`} />
  );
};

export default Divider;

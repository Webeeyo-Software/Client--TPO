import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function DoneButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity className="bg-blue-600 mx-5 rounded-lg py-4 items-center mt-5" onPress={onPress}>
      <Text className="text-white font-semibold text-base">Done</Text>
    </TouchableOpacity>
  );
}

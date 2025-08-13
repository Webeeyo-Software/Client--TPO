import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { twMerge } from "tailwind-merge";

type ContactOptionProps = {
  type: "email" | "sms";
  value: string;
  selected: boolean;
  onPress: () => void;
};

const ContactOption: React.FC<ContactOptionProps> = ({
  type,
  value,
  selected,
  onPress,
}) => {
  const iconName = type === "email" ? "mail" : "chatbubble";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={twMerge(
        "flex-row items-center p-4 rounded-xl border",
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"
      )}
    >
      <View className="w-12 h-12 rounded-lg bg-blue-500 items-center justify-center mr-4">
        <Ionicons name={iconName} size={24} color="white" />
      </View>

      <View className="flex-1">
        <Text className="text-gray-500 text-sm">
          {type === "email" ? "via Email:" : "via SMS:"}
        </Text>
        <Text className="text-gray-900 font-semibold">{value}</Text>
      </View>

      <RadioButton
        value={type}
        status={selected ? "checked" : "unchecked"}
        onPress={onPress}
        color="#1877F2"
      />
    </TouchableOpacity>
  );
};

export default ContactOption;

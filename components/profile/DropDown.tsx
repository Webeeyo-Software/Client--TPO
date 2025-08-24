import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, onValueChange, items }) => {
  const processedItems = items.map((item) => ({
    ...item,
    key: item.value || item.label, // ✅ Fix for unique key warning
  }));

  return (
    <View className="mb-4">
      {label && <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>}

      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={processedItems}
        useNativeAndroidPickerStyle={false}
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "#d1d5db", // Tailwind gray-300
            borderRadius: 8,
            color: "black",
            paddingRight: 30,
          },
          inputAndroid: {
            fontSize: 16,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 8,
            color: "black",
            paddingRight: 30,
          },
          iconContainer: {
            top: 12,
            right: 10,
          },
        }}
        Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
      />
    </View>
  );
};

export default Dropdown;

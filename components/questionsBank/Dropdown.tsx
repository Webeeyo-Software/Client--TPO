// components/ui/Dropdown.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="w-full mb-4">
      {/* Label */}
      <Text className="text-sm text-gray-600 mb-2">{label}</Text>

      {/* Button */}
      <TouchableOpacity
        className="flex-row justify-between items-center border border-gray-300 rounded-lg px-4 py-3 bg-white"
        activeOpacity={0.7}
        onPress={() => setVisible(true)}
      >
        <Text className="text-base text-gray-800">{value}</Text>
        <ChevronDown size={20} color="#555" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setVisible(false)}
        >
          <View className="absolute bottom-0 w-full bg-white rounded-t-xl p-4">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => {
                    onChange(item);
                    setVisible(false);
                  }}
                >
                  <Text className="text-base text-gray-800">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;

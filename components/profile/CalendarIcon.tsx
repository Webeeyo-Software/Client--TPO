
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
interface Props {
  onPress: () => void;
}
const CalendarIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="absolute right-3 top-3">
      <Ionicons name="calendar-outline" size={22} color="#4B5563" />
    </TouchableOpacity>
  );
};

export default CalendarIcon;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";


type Props = {
  label: string;
  date: Date | null;
  onChange: (date: Date) => void;
};

const DateInput = ({ label, date, onChange }: Props) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className="flex-1">
      <Text className="mb-1 text-black">{label}</Text>
      <TouchableOpacity
        className="flex-row items-center justify-between border border-gray-400 rounded-md px-3 py-2"
        activeOpacity={0.7}
        onPress={() => setShowPicker(true)}
      >
        <Text className="text-gray-500">
          {date ? date.toLocaleDateString("en-GB") : "DD-MM-YY"}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="black" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default function DateRangePicker() {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  return (
    <View className="flex-row gap-4">
      <DateInput label="From" date={fromDate} onChange={setFromDate} />
      <DateInput label="To" date={toDate} onChange={setToDate} />
    </View>
  );
}

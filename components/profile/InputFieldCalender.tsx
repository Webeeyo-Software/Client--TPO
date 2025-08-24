
import React, { useState } from "react";
import { View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputField from "components/ui/InputField";
import CalendarIcon from "./CalendarIcon";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
}
const InputFieldCalendar: React.FC<Props> = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formatted = `${selectedDate.getDate().toString().padStart(2, "0")}-${(
        selectedDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${selectedDate.getFullYear()}`;
      onChange(formatted);
    }
  };

  return (
    <View>
      <InputField
        label={label}
        placeholder="DD-MM-YYYY"
        value={value}
        onChangeText={onChange}
      />
      <CalendarIcon onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default InputFieldCalendar;

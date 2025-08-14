import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
type InputFieldProps = {
  label: string;
  placeholder: string;
  value: number | string;
  onChangeText: (text: number | string) => void;
  required?: boolean;
  className?: string;
};
const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
  className,
}: InputFieldProps) => {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <Text className="text-base font-medium mb-1">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value.toString()}
        onChangeText={text => onChangeText(Number(text))}
        className=" rounded-md p-2"
      />
      {required && <Text className="text-red-500 text-xs">Required</Text>}
    </View>
  );
};

export default InputField;
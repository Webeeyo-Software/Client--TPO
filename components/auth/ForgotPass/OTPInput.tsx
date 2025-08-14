import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";

type OTPInputProps = {
  length?: number;
  onChange: (otp: string) => void;
};

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onChange }) => {
  const inputs = useRef<(TextInput | null)[]>([]);
  const [otpValues, setOtpValues] = useState(Array(length).fill(""));

  const handleChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    if (text.length === 1 && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (text.length === 0 && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    onChange(newOtpValues.join(""));
  };

  return (
    <View className="flex-row justify-center space-x-4 mt-6 gap-3">
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => {
            inputs.current[i] = ref;
          }}
          value={otpValues[i]}
          className="w-14 h-14 border border-gray-300 rounded-xl text-center text-lg font-semibold"
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => handleChange(text, i)}
        />
      ))}
    </View>
  );
};

export default OTPInput;

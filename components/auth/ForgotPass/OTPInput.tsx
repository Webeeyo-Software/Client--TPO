import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Text, TextInputKeyPressEventData, NativeSyntheticEvent } from 'react-native';

interface OtpInputProps {
  length?: number; // default 6
  value: string;
  onChange: (otp: string) => void;
  label?: string;
  error?: string | null;
}

const StyledTextInput = TextInput;

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange, label, error }) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const [otpArray, setOtpArray] = useState<string[]>(Array(length).fill(''));

  // Sync external value with internal otpArray (like clearing)
  useEffect(() => {
    if (value === '') {
      setOtpArray(Array(length).fill(''));
    }
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otpArray];
    newOtp[index] = text.slice(-1); // only keep last digit
    setOtpArray(newOtp);
    onChange(newOtp.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="my-4 items-center">
      {label && (
        <Text className="mb-2 text-lg font-semibold text-gray-800">
          {label}
        </Text>
      )}

      <View className="flex-row justify-center">
        {otpArray.map((digit, index) => (
          <StyledTextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            className={`h-14 w-12 mr-2 rounded-xl bg-white text-center text-base text-gray-900 border ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      {error && <Text className="mt-1 text-xs text-red-600">{error}</Text>}
    </View>
  );
};

export default OtpInput;

import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CountdownProps = {
  initialSeconds: number;
  onResend: () => void;
};

const Countdown: React.FC<CountdownProps> = ({ initialSeconds, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <View className="mt-4">
      {seconds > 0 ? (
        <Text className="text-center text-gray-500">
          Resend code in{" "}
          <Text className="text-[#1877F2] font-semibold">{seconds}s</Text>
        </Text>
      ) : (
        <TouchableOpacity onPress={() => { onResend(); setSeconds(initialSeconds); }}>
          <Text className="text-center text-blue-500 font-semibold">
            Resend Code
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Countdown;

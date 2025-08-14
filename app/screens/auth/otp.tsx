import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "components/ui/Header";
import OTPInput from "components/auth/ForgotPass/OTPInput";
import Countdown from "components/auth/ForgotPass/Countdown";

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    console.log("OTP Submitted:", otp);
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="" />

      <View className="px-6 mt-4">
        <Text className="text-2xl font-extrabold text-center text-gray-800">
          OTP Verification
        </Text>
        <Text className="text-center text-gray-500 mt-2">
          Enter the OTP sent to +67-1234-5678-9
        </Text>

        <OTPInput onChange={setOtp} />

        <Countdown
          initialSeconds={56}
          onResend={() => console.log("Resend OTP")}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="absolute bottom-10 self-center bg-blue-500 w-[90%] py-4 rounded-xl"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

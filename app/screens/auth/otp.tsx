import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "components/ui/Header";
import OTPInput from "components/auth/ForgotPass/OTPInput";
import Countdown from "components/auth/ForgotPass/Countdown";
import PrimaryButton from "components/ui/PrimaryButton";
import { router } from "expo-router";

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    console.log("OTP Submitted:", otp);
    router.push('screens/auth/resetPassScreen');
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

        <View className="mt-96 pt-56">
        <PrimaryButton label="Submit" onPress={handleSubmit} />
        </View>
    </View>
  );
};

export default OtpVerificationScreen;

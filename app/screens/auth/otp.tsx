import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_BASE_URL } from "utils/api";
import Header from "components/ui/Header";
import Title from "components/auth/Login/Title";
import OtpInput from "components/auth/ForgotPass/OTPInput";

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useLocalSearchParams();
  const email = params?.email as string;
  const router = useRouter();

  const handleSubmit = async () => {
    if (!otp) {
      setError("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/auth/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "OTP verified");
        router.replace({ pathname: "/screens/auth/resetPassScreen", params: { email } });
      } else {
        setError("Invalid OTP");
      }
    } catch {
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="" />
      <Title title1="OTP" title2="Verification" />

      <OtpInput
        label="Enter Otp"
        value={otp}
        onChange={(val) => {
          setOtp(val);
          setError(null); // clear error on input change
        }}
        length={6}
        error={error}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-lg mt-6"
      >
        <Text className="text-white text-center text-base">
          {loading ? "Verifying..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

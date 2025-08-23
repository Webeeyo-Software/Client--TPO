import  { useState } from "react";
import { View, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "components/ui/Header";
import InputField from "components/ui/InputField";
import PrimaryButton from "components/ui/PrimaryButton";
import Title from "components/auth/Login/Title";
import { API_BASE_URL } from "utils/api";

const ResetPasswordScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Failed to reset password");
        return;
      }

      Alert.alert("Success", "Password reset successful!");
      router.replace("/screens/auth/LoginScreen");
    } catch (err) {
      Alert.alert(`Error`, `Network error ${err}`,);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Title title1="Reset" title2="Password" />
      <View className="mx-5 mt-5">
        <InputField
          label="New Password"
          placeholder="Enter your password"
          type="password"
          value={newPassword}
          onChangeText={setNewPassword}
          required
        />
        <InputField
          label="Confirm new password"
          placeholder="Re-enter new password"
          type="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          required
        />
        <View className="mt-20">
          <PrimaryButton label="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import Header from "components/ui/Header";
import InputField from "components/ui/InputField";
import PrimaryButton from "components/ui/PrimaryButton";
import { useRouter } from "expo-router";
import Title from "components/auth/Login/Title";
const ResetPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    router.push('screens/auth/verifyComplete');
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Title title1="Reset" title2="Password"/>
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
        <View className="mt-96 pt-56">
        <PrimaryButton label="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

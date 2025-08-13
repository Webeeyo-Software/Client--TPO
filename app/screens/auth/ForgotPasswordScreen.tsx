import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContactOption from "components/auth/ForgotPass/ContactOption";
import PrimaryButton from "components/ui/PrimaryButton";
import { router } from "expo-router";

const ForgotPasswordScreen = () => {
  const [selected, setSelected] = useState<"email" | "sms">("email");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Arrow */}
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        />

        {/* Title */}
        <Text className="text-3xl font-extrabold text-gray-900">
          Forgot{"\n"}Password ?
        </Text>
        <Text className="text-gray-500 mt-2 leading-5">
          Don’t worry! It happens. Please select the email or number associated
          with your account.
        </Text>

        {/* Options */}
        <View className="mt-6 space-y-4">
          <ContactOption
            type="email"
            value="example@youremail.com"
            selected={selected === "email"}
            onPress={() => setSelected("email")}
          />
          <ContactOption
            type="sms"
            value="+62-8421-4512-2531"
            selected={selected === "sms"}
            onPress={() => setSelected("sms")}
          />
        </View>

        <View className="mt-10">
          <PrimaryButton label="Submit" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

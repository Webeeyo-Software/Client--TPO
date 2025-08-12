import React, { FC } from "react";
import { View } from "react-native";
import OnboardingImage from "../../../components/auth/onboardingImage";
import OnboardingText from "../../../components/auth/OnboardingText";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../components/auth/SecondaryButton";

const OnboardingScreen: FC = () => {
  return (
    <View className="flex-1 mt-40 bg-transparent">
      <OnboardingImage/>
      <OnboardingText
        title="Welcome to Career Compass"
        description="Your journey to professional success starts here. Discover opportunities and enhance your skills."
      />
      <View className="px-6 mt-4">
        <PrimaryButton label="Get Started" onPress={() => {}} />
        <SecondaryButton label="Learn More" onPress={() => {}} />
      </View>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-52 space-x-2 gap-3">
        <View className="w-2 h-2 bg-black rounded-full" />
        <View className="w-2 h-2 bg-gray-300 rounded-full" />
        <View className="w-2 h-2 bg-gray-300 rounded-full" />
      </View>
    </View>
  );
};

export default OnboardingScreen;

import { View, SafeAreaView } from "react-native";
import Logo from "components/auth/Logo";
import SuccessMessage from "components/auth/SuccessMessage";
import PrimaryButton from "components/ui/PrimaryButton";
import { useRouter } from "expo-router";

export default function verifyComplete() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <View className="flex-col justify-center">
        <Logo />
        <SuccessMessage />
      </View>
    <View>
        <View className="pt-16">
      <PrimaryButton
       label="Go to Homepage"
        onPress={() => router.push("navigation/drawer")}
      />
      </View>
    </View>
    </View>
  );
}

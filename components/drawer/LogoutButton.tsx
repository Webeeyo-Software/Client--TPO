import { TouchableOpacity, Text, View, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LogoutButtonProps = {
  onLogout?: () => void;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");

      if (onLogout) onLogout();

      router.replace("/screens/auth/LoginScreen");
    } catch (error) {
      Alert.alert("Logout failed", "Unable to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleLogout}
      className="flex-row items-center p-4 bg-red-500 rounded-xl mt-4 mx-2"
    >
      <View className="flex-row items-center">
        <MaterialIcons name="logout" size={22} color="white" />
        <Text className="text-white text-base font-semibold ml-3">Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;

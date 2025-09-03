import { TouchableOpacity, Text, View, Alert } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  onAccept: () => void;
  onReject: () => void;
}

export default function ActionButtons({ onAccept, onReject }: Props) {
  const router = useRouter();

  const handleAccept = () => {
    Alert.alert("Offer Accepted", "You accepted the offer.", [
      { text: "OK", onPress: onAccept },
    ]);
  };

  const handleReject = () => {
    Alert.alert("Confirmation", "Are you sure you want to reject?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Reject",
        style: "destructive",
        onPress: () => {
          onReject(); // update status
        //   router.replace("/"); // navigate to Home screen
        },
      },
    ]);
  };

  return (
    <View className="flex-row justify-between mt-6">
      <TouchableOpacity
        onPress={handleAccept}
        className="flex-1 bg-green-600 py-3 rounded-xl mx-2"
      >
        <Text className="text-white text-center font-bold">Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleReject}
        className="flex-1 bg-red-600 py-3 rounded-xl mx-2"
      >
        <Text className="text-white text-center font-bold">Reject</Text>
      </TouchableOpacity>
    </View>
  );
}

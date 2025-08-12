import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="h-14 flex-row items-center bg-transparent  px-4">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.6}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text className="ml-2 text-lg font-semibold text-gray-900">{title}</Text>
    </View>
  );
}

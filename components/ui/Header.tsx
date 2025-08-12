import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

type HeaderProps = {
  title: string;
  mode?: 'normal' | 'close'; 
};

export default function Header({ title, mode = 'normal' }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="h-14 flex-row items-center bg-transparent">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.6}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel={mode === 'close' ? 'Close' : 'Go back'}
      >
        <AntDesign
          name={mode === 'close' ? 'close' : 'arrowleft'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text className="ml-2 text-lg font-semibold text-gray-900">{title}</Text>
    </View>
  );
}

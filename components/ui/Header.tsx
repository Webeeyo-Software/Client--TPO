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
<<<<<<< HEAD
    <View className="h-14 flex-row items-center bg-transparent">
=======
    <View className="h-14 flex-row items-center bg-transparent mt-8">
>>>>>>> OffCampus_YS
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.6}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel={mode === 'close' ? 'Close' : 'Go back'}
      >
        <AntDesign
          name={mode === 'close' ? 'close' : 'arrowleft'}
          size={26}
          color="black"
        />
      </TouchableOpacity>
      <Text className="ml-2 text-2xl font-semibold text-gray-900">{title}</Text>
    </View>
  );
}

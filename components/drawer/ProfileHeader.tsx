import { View, Text, Image } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

type ProfileHeaderProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  verified?: boolean;
};

export default function ProfileHeader({
  name,
  email,
  avatarUrl,
  verified = false,
}: ProfileHeaderProps) {
  return (
    <View className="flex-row items-center bg-white p-4">
      <View className="relative">
        <Image
          source={avatarUrl ? require('../../assets/images/abhi.jpg') : { uri: avatarUrl }}
          className="h-16 w-16 rounded-full border-2 border-[#1877F2]}"
        />
        {verified && (
          <View className="absolute bottom-0 right-0 rounded-full bg-white p-[1px]">
            <CheckCircle size={16} color="#1877F2" fill="transparent" />
          </View>
        )}
      </View>

      {/* Text Info */}
      <View className="ml-3">
        <Text className="text-base font-semibold text-black">{name}</Text>
        <Text className="text-sm text-gray-500">{email}</Text>
      </View>
    </View>
  );
}

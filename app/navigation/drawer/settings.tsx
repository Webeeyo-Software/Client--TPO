import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function settings() {
  return (
      <SafeAreaView>
        <View className='items-center justify-center bg-[#1877F2] py-60 m-11 rounded-lg mt-60'>
          <Text text-xl>Settingss</Text>
        </View>
      </SafeAreaView>
  );
}

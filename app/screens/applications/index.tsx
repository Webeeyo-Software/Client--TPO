import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/ui/Header';
import '../../../global.css';

export default function Applications() {
  return (
      <SafeAreaView>
        <Header title='Applications' mode='normal'/>
        <View className='items-center justify-center bg-[#1877F2] py-60 m-11 rounded-lg mt-60'>
          <Text text-xl>Applications</Text>
        </View>
      </SafeAreaView>
  );
}

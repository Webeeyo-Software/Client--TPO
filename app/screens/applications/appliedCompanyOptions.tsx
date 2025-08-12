import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ApplicationItem from '../../../components/applications/ApplicationItem';
import Header from 'components/ui/Header';
const detailsIcon = require('../../../assets/images/details.png');
const trackingIcon = require('../../../assets/images/tracking.png');

export default function ApplicationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title='Applied Company' mode="normal"/>
      <View className='flex-col gap-2 mt-10'>
      <ApplicationItem
        icon={detailsIcon}
        title="Details"
        subtitle="Check filled details"
        onPress={() => router.push('screens/applications/details')}
      />

      <ApplicationItem
        icon={trackingIcon}
        title="Application status"
        subtitle="Check application status"
        onPress={() => router.push('screens/applications/applicationStatus')}
      />
      </View>
    </View>
  );
}

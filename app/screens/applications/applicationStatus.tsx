import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from '../../../components/applications/applicationStatus/ProgressBar';
import { StatusStep } from '../../../components/applications/applicationStatus/StatusStep';
import { Feather } from '@expo/vector-icons';
import Divider from 'components/ui/Divider';
import Header from 'components/ui/Header';
export default function ApplicationStatusScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-12">
      <Header title='Application Status'/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        {/* Top progress info */}
        <Text className="mb-2 font-semibold text-gray-900">Application Received</Text>
        <ProgressBar progress={25} />
        <Text className="mt-1 text-[#1877F2]">25%</Text>

        {/* Status Steps */}
        <View className="mt-6 space-y-8">
          <StatusStep icon="file-text" title="Application Submitted" date="July 10, 2025" />
          <Divider />
          <StatusStep icon="search" title="Under Review" date="August 02, 2025" />
          <Divider />

          <StatusStep icon="calendar-today" title="Interview Scheduled" date="August 16, 2025" />
          <Divider />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

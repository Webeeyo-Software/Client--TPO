// screens/ApplicationScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import ApplicationItem from '../../../components/applications/ApplicationItem';
import Header from 'components/ui/Header';
const drivesIcon = require('../../../assets/images/drives.png'); // Use your own images
const appliedCompaniesIcon = require('../../../assets/images/company.png');

export default function ApplicationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title='Applications' mode="normal"/>
      <View className='flex-col gap-2 mt-10'>
      <ApplicationItem
        icon={drivesIcon}
        title="Drives"
        subtitle="Explore Drives"
        onPress={() => router.push('screens/applications/drives')}
      />

      <ApplicationItem
        icon={appliedCompaniesIcon}
        title="Applied Companies"
        subtitle="View applied companies"
        onPress={() => router.push('screens/applications/appliedCompanies')}
      />
      </View>
    </View>
  );
}

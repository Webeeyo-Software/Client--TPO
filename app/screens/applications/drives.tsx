import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, Image } from 'react-native';
import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
import { Pagination } from '../../../components/applications/Drives/Pagination';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from 'components/ui/Header';
import { router, useRouter } from 'expo-router';
export default function DrivesScreen() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const companies = [
    {
      logo: require('../../../assets/images/micro.png'),
      name: 'Microsoft Corporation',
      type: 'Placement',
    },
    {
      logo: require('../../../assets/images/amazon.png'),
      name: 'Amazon.com, Inc.',
      type: 'Internship',
    },
    {
      logo: require('../../../assets/images/Cisco.png'),
      name: 'Cisco Systems, Inc.',
      type: 'Industrial Training',
    },
    {
      logo: require('../../../assets/images/google.png'),
      name: 'Google LLC',
      type: 'Internship + Placement',
    },
    {
      logo: require('../../../assets/images/paypal.png'),
      name: 'PayPal Holdings, Inc.',
      type: 'Internship + Performance based PPO',
    },
    {
      logo: require('../../../assets/images/amazon.png'),
      name: 'Amazon.com, Inc.',
      type: 'Internship',
    },
    {
      logo: require('../../../assets/images/Cisco.png'),
      name: 'Cisco Systems, Inc.',
      type: 'Industrial Training',
    },
    {
      logo: require('../../../assets/images/Cisco.png'),
      name: 'Cisco Systems, Inc.',
      type: 'Industrial Training',
    },
    {
      logo: require('../../../assets/images/Cisco.png'),
      name: 'Cisco Systems, Inc.',
      type: 'Industrial Training',
    },
  ];

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Drives" mode="normal" />

      <View className="mt- mx-4 mb-4 flex-row items-center rounded-xl bg-gray-100 px-3 py-2 gap-3">
        <Feather name="search" size={20} color="black" />
        <TextInput
          placeholder="Search companies for Drives"
          className="flex-1 text-m text-gray-700"
          placeholderTextColor="#9CA3AF"
        />
        <AntDesign name="filter" size={20} color="black" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, marginTop: 13, gap: 3,paddingVertical:10 }}>
        {companies.map((company, idx) => (
          <CompanyCard
            key={idx}
            logo={company.logo}
            name={company.name}
            type={company.type}
            onPress={() => router.push('screens/applications/appliedCompanyOptions')}
          />
        ))}
      </ScrollView>
      <Pagination current={page} total={10} onPageChange={setPage} />
    </View>
  );
}

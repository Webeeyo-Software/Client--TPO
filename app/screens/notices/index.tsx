import React from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../../../components/ui/Header';
import NoticeCard from '../../../components/notices/NoticeCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
type Company = {
  id: string;
  title: string;
  description: string;
  logo?: any;
};

const companies: Company[] = [
  {
    id: '1',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
  {
    id: '2',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
  {
    id: '3',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
  {
    id: '4',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
  },
  {
    id: '5',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
  {
    id: '6',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
  {
    id: '7',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
  {
    id: '8',
    title: "Today's scheduled companies",
    description: 'Here are top ten companies for the software developers',
    logo: require('../../../assets/images/google.png'),
  },
];

export default function NoticesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-12">
      <View className="flex-row items-baseline gap-52">
        <Header title="Notices" mode="normal" />
        <View className='flex-row gap-3'>
          <TouchableOpacity onPress={() => {}}>
          <Ionicons name="mail-unread-outline" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push('screens/notices/FilterScreen')}}>
          <AntDesign name="filter" size={26} color="black" />
        </TouchableOpacity>
        
        </View>
      </View>

      <FlatList
        data={companies}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item, index }) => (
          <NoticeCard title={item.title} description={item.description} logo={item.logo} />
        )}
      />
    </SafeAreaView>
  );
}

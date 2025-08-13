import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, SafeAreaView, TextInput, Animated, FlatList } from 'react-native';
import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
import { Pagination } from '../../../components/applications/Drives/Pagination';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from 'components/ui/Header';
import { useRouter } from 'expo-router';

export default function DrivesScreen() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const searchOpacity = useMemo(() => new Animated.Value(0), []);
  const searchTranslateY = useMemo(() => new Animated.Value(20), []);

  useEffect(() => {
    Animated.timing(searchOpacity, {
      toValue: 1,
      duration: 500,
      delay: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(searchTranslateY, {
      toValue: 0,
      duration: 500,
      delay: 150,
      useNativeDriver: true,
    }).start();
  }, [searchOpacity, searchTranslateY]);

  const companies = [
    { logo: require('../../../assets/images/micro.png'), name: 'Microsoft Corporation', type: 'Placement' },
    { logo: require('../../../assets/images/amazon.png'), name: 'Amazon.com, Inc.', type: 'Internship' },
    { logo: require('../../../assets/images/Cisco.png'), name: 'Cisco Systems, Inc.', type: 'Industrial Training' },
    { logo: require('../../../assets/images/google.png'), name: 'Google LLC', type: 'Internship + Placement' },
    { logo: require('../../../assets/images/paypal.png'), name: 'PayPal Holdings, Inc.', type: 'Internship + Performance based PPO' },
    { logo: require('../../../assets/images/amazon.png'), name: 'Amazon.com, Inc.', type: 'Internship' },
    { logo: require('../../../assets/images/Cisco.png'), name: 'Cisco Systems, Inc.', type: 'Industrial Training' },
    { logo: require('../../../assets/images/Cisco.png'), name: 'Cisco Systems, Inc.', type: 'Industrial Training' },
    { logo: require('../../../assets/images/Cisco.png'), name: 'Cisco Systems, Inc.', type: 'Industrial Training' },
  ];

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Drives" mode="normal" />

      <Animated.View
        className="mt-5 mx-1 mb-4 flex-row items-center rounded-xl bg-gray-100 px-3 py-2 gap-3"
        style={{
          opacity: searchOpacity,
          transform: [{ translateY: searchTranslateY }],
        }}
      >
        <Feather name="search" size={20} color="black" />
        <TextInput
          placeholder="Search companies for Drives"
          className="flex-1 text-m text-gray-700"
          placeholderTextColor="#9CA3AF"
        />
        <AntDesign name="filter" size={20} color="black" onPress={()=>{router.push('screens/applications/FilterScreen')}}/>
      </Animated.View>

      <Animated.FlatList
        data={companies}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.95],
          });
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={{ transform: [{ scale }], opacity }}>
              <CompanyCard
                logo={item.logo}
                name={item.name}
                type={item.type}
                onPress={() =>
                  router.push("screens/applications/appliedCompanyOptions")
                }
              />
            </Animated.View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          marginTop: 13,
          gap: 2,
          paddingVertical: 10,
        }}
      />

      <Pagination current={page} total={10} onPageChange={setPage} />
    </View>
  );
}

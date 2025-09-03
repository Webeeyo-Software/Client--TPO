// screens/applications/drives/index.tsx

import { useState, useRef, useEffect, useMemo } from 'react';
import { FlatListProps, View, TextInput, Animated, FlatList, Text, ListRenderItemInfo } from 'react-native';
import LottieView from 'lottie-react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from 'components/ui/Header';
import { useRouter } from 'expo-router';
import api from 'utils/authApi';
import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
import { Pagination } from '../../../components/applications/Drives/Pagination';

type PlacementDrive = {
  id: string;
  companyId: string;
  position: string;
  driveDate: string;
  applicationDeadline: string;
  companyName: string | null;
  companyLogo: string | null;
  driveType: string | null;
};

type ApiResponse = {
  success: boolean;
  data: PlacementDrive[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as React.ComponentType<FlatListProps<PlacementDrive>>;

export default function DrivesScreen() {
  const [page, setPage] = useState<number>(1);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const searchOpacity = useMemo(() => new Animated.Value(0), []);
  const searchTranslateY = useMemo(() => new Animated.Value(20), []);

  const fetchPlacementDrives = async (pageNum: number, searchTerm: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageNum),
        search: searchTerm.trim(),
      }).toString();
      const { data: json } = await api.get<ApiResponse>(`/api/applications/alldrives?${query}`);
      if (json.success && Array.isArray(json.data)) {
        setDrives(json.data);
        setTotalPages(json.pagination?.totalPages ?? 1);
      } else {
        setDrives([]);
        setTotalPages(1);
      }
    } catch (error) {
      setDrives([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchPlacementDrives(1, search);
    }, 700);
    return () => clearTimeout(timeout);
  }, [search]);

  // Pagination
  useEffect(() => {
    if (page !== 1) {
      fetchPlacementDrives(page, search);
    }
  }, [page]);

  // Search Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(searchOpacity, {
        toValue: 1,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(searchTranslateY, {
        toValue: 0,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [searchOpacity, searchTranslateY]);

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Drives" mode="normal" />
      {/* Search Bar */}
      <Animated.View
        style={{
          opacity: searchOpacity,
          transform: [{ translateY: searchTranslateY }],
        }}
        className="flex-row items-center mx-1 my-4 rounded-xl bg-gray-100 px-3 py-2"
      >
        <Feather name="search" size={20} color="black" />
        <TextInput
          placeholder="Search companies for Drives"
          className="flex-1 text-base text-gray-700 ml-2"
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <AntDesign
          name="filter"
          size={20}
          color="black"
          onPress={() => router.push('screens/applications/FilterScreen')}
        />
      </Animated.View>

      {/* Loader */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <LottieView
            source={require('../../../assets/images/loader.json')}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
        </View>
      ) : (
        <AnimatedFlatList
          data={drives}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }: ListRenderItemInfo<PlacementDrive>) => {
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
                  logo={item.companyLogo ? { uri: item.companyLogo } : require('../../../assets/images/companyLogo.png')}
                  name={item.companyName || 'Unknown Company'}
                  type={item.driveType || 'Unknown Type'}
                  onPress={() =>
                    router.push(`screens/applications/details/${item.id}`) // Dynamic navigation!
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
          contentContainerStyle={{ paddingBottom: 44, paddingTop: 8 }}
          ListEmptyComponent={
            !loading && (
              <View className="mt-20 items-center">
                <Text className="text-gray-600">No drives found.</Text>
              </View>
            )
          }
        />
      )}

      <Pagination current={page} total={totalPages} onPageChange={setPage} />
    </View>
  );
}

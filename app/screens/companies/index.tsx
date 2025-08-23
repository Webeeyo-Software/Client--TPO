import { useState, useRef, useEffect, useMemo } from 'react';
import { View, TextInput, Animated, FlatList, Text, ActivityIndicator } from 'react-native';
import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
import { Pagination } from '../../../components/applications/Drives/Pagination';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from 'components/ui/Header';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from 'utils/api';

type Company = {
  id: string;
  name: string;
  userId: string;
  description: string;
  logo?: any;
};

type ApiResponse = {
  success: boolean;
  data: Company[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

// Create animated FlatList wrapper
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function DrivesScreen() {
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalPages, setTotalPages] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const searchOpacity = useMemo(() => new Animated.Value(0), []);
  const searchTranslateY = useMemo(() => new Animated.Value(20), []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchCompanies(1, search);
    }, 700);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (page !== 1) fetchCompanies(page, search);
  }, [page]);

  const fetchCompanies = async (pageNum: number, searchTerm: string) => {
    setLoading(true);
    try {
      const baseURL = `${API_BASE_URL}/api/companies/search`;
      const query = new URLSearchParams({
        page: String(pageNum),
        search: searchTerm.trim(),
      }).toString();

      const url = `${baseURL}?${query}`;

      const response = await fetch(url);
      if (!response.ok) {
        console.error('[Fetch Companies] HTTP Error:', response.status);
        setCompanies([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      const json: ApiResponse = await response.json();

      if (json.success && Array.isArray(json.data)) {
        const mappedCompanies = json.data.map((company) => ({
          ...company,
          logo: require('../../../assets/images/icon.png'),
        }));
        setCompanies(mappedCompanies);
        setTotalPages(json.pagination.totalPages);
      } else {
        setCompanies([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('[Fetch Companies] Error:', error);
      setCompanies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

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
      <Header title="Companies" mode="normal" />

      <Animated.View
        className="mx-1 mb-4 mt-5 flex-row items-center gap-3 rounded-xl bg-gray-100 px-3 py-2"
        style={{
          opacity: searchOpacity,
          transform: [{ translateY: searchTranslateY }],
        }}>
        <Feather name="search" size={20} color="black" />
        <TextInput
          placeholder="Search companies"
          className="flex-1 text-base text-gray-700"
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
          onPress={() => router.push('screens/companies/FilterCompanies')}
        />
      </Animated.View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <AnimatedFlatList
          data={companies}
          keyExtractor={(item: Company) => item.id}
          renderItem={({ item, index }: { item: Company; index: number }) => {
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
                  type={item.description}
                  onPress={() => router.push(`screens/companies/details/${item.id}`)}
                />
              </Animated.View>
            );
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 44, gap: 8, marginTop: 8 }}
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Text>No companies found.</Text>
            </View>
          }
        />
      )}

      <Pagination current={page} total={totalPages} onPageChange={setPage} />
    </View>
  );
}

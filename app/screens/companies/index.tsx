import  { useState, useRef, useEffect, useMemo } from 'react';
import { FlatListProps } from 'react-native';

import {
  View,
  TextInput,
  Animated,
  FlatList,
  Text,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native';
import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
import { Pagination } from '../../../components/applications/Drives/Pagination';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from 'components/ui/Header';
import { useRouter } from 'expo-router';
import api from 'utils/authApi'; 


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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as React.ComponentType<FlatListProps<Company>>;


export default function DrivesScreen() {
  const [page, setPage] = useState<number>(1);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const searchOpacity = useMemo(() => new Animated.Value(0), []);
  const searchTranslateY = useMemo(() => new Animated.Value(20), []);

  const fetchCompanies = async (pageNum: number, searchTerm: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pageNum),
        search: searchTerm.trim(),
      }).toString();

      const { data: json } = await api.get<ApiResponse>(
        `/api/companies/search?${query}`
      );

      if (json.success && Array.isArray(json.data)) {
        const mappedCompanies: Company[] = json.data.map((company) => ({
          ...company,
          logo: require('../../../assets/images/companyLogo.png'),
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
    const timeout = setTimeout(() => {
      setPage(1);
      fetchCompanies(1, search);
    }, 700);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (page !== 1) {
      fetchCompanies(page, search);
    }
  }, [page]);

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
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 48 }}>
      <Header title="Companies" mode="normal" />

      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 4,
          marginVertical: 16,
          borderRadius: 12,
          backgroundColor: '#F3F4F6',
          paddingHorizontal: 12,
          paddingVertical: 8,
          opacity: searchOpacity,
          transform: [{ translateY: searchTranslateY }],
        }}
      >
        <Feather name="search" size={20} color="black" />
        <TextInput
          placeholder="Search companies"
          style={{
            flex: 1,
            fontSize: 16,
            color: '#374151',
            marginLeft: 8,
          }}
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <AnimatedFlatList
          data={companies}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }: ListRenderItemInfo<Company>) => {
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
                  onPress={() =>
                    router.push(`screens/companies/details/${item.id}`)
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
            paddingBottom: 44,
            paddingTop: 8,
            gap: 8,
          }}
          ListEmptyComponent={
            <View style={{ marginTop: 80, alignItems: 'center' }}>
              <Text>No companies found.</Text>
            </View>
          }
        />
      )}

      <Pagination current={page} total={totalPages} onPageChange={setPage} />
    </View>
  );
}

// // import React from 'react';
// // import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// // import { MaterialIcons, Feather } from '@expo/vector-icons';
// // import Header from 'components/ui/Header';

// // export default function UploadCVScreen() {
// //   return (
// //     <View className="flex-1 px-4 pt-10 bg-white">
// //       <Header title="Upload CV" mode="normal" />
// //       <View className=" bg-white mt-8">
// //         <ScrollView contentContainerStyle={{ padding: 15 }}>

// //           <View className="rounded-lg bg-white shadow-md overflow-hidden">
// //             {/* Card Header */}
// //             <View className="bg-blue-500 px-3 py-2">
// //               <Text className="text-white font-bold text-base">
// //                 Software Developer
// //               </Text>
// //             </View>


// //             <View className="p-3">
// //               <Text className="font-bold text-blue-500 mb-1">
// //                 CV Name: <Text className="font-normal text-black">Abhishek.pdf</Text>
// //               </Text>
// //               <Text className="font-bold text-blue-500 mb-1">
// //                 CV Type: <Text className="font-normal text-black">Software Developer</Text>
// //               </Text>
// //               <View className="flex-row items-center">
// //                 <Text className="font-bold text-blue-500">Is Default: </Text>
// //                 <MaterialIcons name="check-circle" size={20} color="green" />
// //               </View>
// //             </View>


// //             <View className="flex-row justify-between px-3 py-2">
// //               <TouchableOpacity>
// //                 <Feather name="edit-3" size={22} color="#007BFF" />
// //               </TouchableOpacity>
// //               <TouchableOpacity>
// //                 <MaterialIcons name="delete" size={24} color="red" />
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </ScrollView>
// //       </View>
// //     </View>
// //   );
// // }



// import  { useState, useRef, useEffect, useMemo } from 'react';
// import { FlatListProps } from 'react-native';

// import {
//   View,
//   TextInput,
//   Animated,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   ListRenderItemInfo,
// } from 'react-native';
// import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
// import { Pagination } from '../../../components/applications/Drives/Pagination';
// import Feather from '@expo/vector-icons/Feather';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Header from 'components/ui/Header';
// import { useRouter } from 'expo-router';
// import api from 'utils/authApi'; 


// type Company = {
//   id: string;
//   name: string;
//   userId: string;
//   description: string;
//   logo?: any;
// };

// type ApiResponse = {
//   success: boolean;
//   data: Company[];
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//   };
// };

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as React.ComponentType<FlatListProps<Company>>;


// export default function DrivesScreen() {
//   const [page, setPage] = useState<number>(1);
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [totalPages, setTotalPages] = useState<number>(10);
//   const [search, setSearch] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const router = useRouter();
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const searchOpacity = useMemo(() => new Animated.Value(0), []);
//   const searchTranslateY = useMemo(() => new Animated.Value(20), []);

//   const fetchCompanies = async (pageNum: number, searchTerm: string) => {
//     setLoading(true);
//     try {
//       const query = new URLSearchParams({
//         page: String(pageNum),
//         search: searchTerm.trim(),
//       }).toString();

//       const { data: json } = await api.get<ApiResponse>(
//         /api/companies/search?${query}
//       );

//       if (json.success && Array.isArray(json.data)) {
//         const mappedCompanies: Company[] = json.data.map((company) => ({
//           ...company,
//           logo: require('../../../assets/images/companyLogo.png'),
//         }));

//         setCompanies(mappedCompanies);
//         setTotalPages(json.pagination.totalPages);
//       } else {
//         setCompanies([]);
//         setTotalPages(1);
//       }
//     } catch (error) {
//       console.error('[Fetch Companies] Error:', error);
//       setCompanies([]);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setPage(1);
//       fetchCompanies(1, search);
//     }, 700);

//     return () => clearTimeout(timeout);
//   }, [search]);

//   useEffect(() => {
//     if (page !== 1) {
//       fetchCompanies(page, search);
//     }
//   }, [page]);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(searchOpacity, {
//         toValue: 1,
//         duration: 500,
//         delay: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(searchTranslateY, {
//         toValue: 0,
//         duration: 500,
//         delay: 150,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [searchOpacity, searchTranslateY]);

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 48 }}>
//       <Header title="Companies" mode="normal" />

//       <Animated.View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginHorizontal: 4,
//           marginVertical: 16,
//           borderRadius: 12,
//           backgroundColor: '#F3F4F6',
//           paddingHorizontal: 12,
//           paddingVertical: 8,
//           opacity: searchOpacity,
//           transform: [{ translateY: searchTranslateY }],
//         }}
//       >
//         <Feather name="search" size={20} color="black" />
//         <TextInput
//           placeholder="Search companies"
//           style={{
//             flex: 1,
//             fontSize: 16,
//             color: '#374151',
//             marginLeft: 8,
//           }}
//           placeholderTextColor="#9CA3AF"
//           value={search}
//           onChangeText={setSearch}
//           autoCorrect={false}
//           autoCapitalize="none"
//           returnKeyType="search"
//           clearButtonMode="while-editing"
//         />
//         <AntDesign
//           name="filter"
//           size={20}
//           color="black"
//           onPress={() => router.push('screens/companies/FilterCompanies')}
//         />
//       </Animated.View>

//       {loading ? (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <ActivityIndicator size="large" color="#3B82F6" />
//         </View>
//       ) : (
//         <AnimatedFlatList
//           data={companies}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item, index }: ListRenderItemInfo<Company>) => {
//             const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
//             const scale = scrollY.interpolate({
//               inputRange,
//               outputRange: [1, 1, 1, 0.95],
//             });
//             const opacity = scrollY.interpolate({
//               inputRange,
//               outputRange: [1, 1, 1, 0],
//             });

//             return (
//               <Animated.View style={{ transform: [{ scale }], opacity }}>
//                 <CompanyCard
//                   logo={item.logo}
//                   name={item.name}
//                   type={item.description}
//                   onPress={() =>
//                     router.push(screens/companies/details/${item.id})
//                   }
//                 />
//               </Animated.View>
//             );
//           }}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//           scrollEventThrottle={16}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingBottom: 44,
//             paddingTop: 8,
//             gap: 8,
//           }}
//           ListEmptyComponent={
//             <View style={{ marginTop: 80, alignItems: 'center' }}>
//               <Text>No companies found.</Text>
//             </View>
//           }
//         />
//       )}

//       <Pagination current={page} total={totalPages} onPageChange={setPage} />
//     </View>
//   );
// }
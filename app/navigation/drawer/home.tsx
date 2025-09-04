import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, Animated, Image, FlatList, ListRenderItemInfo } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import MenuCard from '../../../components/home/MenuCard';
import { useRouter } from 'expo-router';

// ---------------- TYPES ----------------

interface DecodedToken {
  userId: string;
  role: string;
  firstname?: string;
  profile_url?: string;
  exp?: number;
  iat?: number;
}

interface MenuItem {
  title: keyof typeof ROUTE_MAP;
  description: string;
  icon: any;
}

// ---------------- ICONS ----------------

const icons = {
  companies: require('../../../assets/images/companies.png'),
  applications: require('../../../assets/images/applications.png'),
  profile: require('../../../assets/images/profile.png'),
  notices: require('../../../assets/images/notice.png'),
  offCampus: require('../../../assets/images/offCampus.png'),
  schedule: require('../../../assets/images/schedule.png'),
  tporeg: require('../../../assets/images/tporeg.png'),
  quesb: require('../../../assets/images/quesb.png'),
} as const;

// ---------------- DATA ----------------

const DATA: MenuItem[] = [
  { title: 'Companies', description: 'Explore companies and opportunities', icon: icons.companies },
  { title: 'Applications', description: 'Manage your applications', icon: icons.applications },
  { title: 'Profile', description: 'View and update your profile', icon: icons.profile },
  { title: 'Notices', description: 'Stay updated with important notices', icon: icons.notices },
  { title: 'Off Campus', description: 'Explore off-campus opportunities', icon: icons.offCampus },
  { title: 'Scheduled Companies', description: 'View scheduled company visits', icon: icons.schedule },
  { title: 'TPO Registration', description: 'Register for Training and Placement', icon: icons.tporeg },
  { title: 'Question bank', description: 'Access previous year Questions', icon: icons.quesb },
];

// ---------------- ROUTES ----------------

const ROUTE_MAP = {
  Companies: 'screens/companies',
  Applications: 'screens/applications',
  Profile: 'screens/profile',
  Notices: 'screens/notices',
  'Off Campus': 'screens/offCampus',
  'Scheduled Companies': 'screens/scheduledCompanies',
  'TPO Registration': 'screens/tpoRegistration',
  'Question bank': '/screens/questionsBank',
} as const;

type RouteKey = keyof typeof ROUTE_MAP;

// ---------------- CONSTANTS ----------------

const CARD_HEIGHT = 100;

// ---------------- COMPONENT ----------------

const HomeScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const [firstName, setFirstName] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const loadUserDataFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<DecodedToken>(token);
          setFirstName(decoded.firstname ?? null);
          setProfileImageUri(decoded.profile_url ?? null);
          console.log(decoded.profile_url);
        } else {
          setFirstName(null);
          setProfileImageUri(null);
        }
      } catch (error) {
        console.warn('Failed to load or decode token', error);
        setFirstName(null);
        setProfileImageUri(null);
      }
    };

    loadUserDataFromToken();

    Animated.parallel([
      Animated.timing(imageOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(imageTranslateY, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageOpacity, imageTranslateY, textOpacity, textTranslateY]);

  const handleCardPress = useCallback(
    (title: RouteKey) => {
      const path = ROUTE_MAP[title];
      if (path) {
        router.push(path as any);
      } else {
        console.warn(`No route defined for ${title}`);
      }
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<MenuItem>) => (
      <MenuCard
        title={item.title}
        description={item.description}
        icon={item.icon}
        scrollY={scrollY}
        index={index}
        cardHeight={CARD_HEIGHT}
        onPress={() => handleCardPress(item.title)}
      />
    ),
    [scrollY, handleCardPress]
  );

  const getItemLayout = useCallback(
    (_: MenuItem[] | null | undefined, index: number) => ({
      length: CARD_HEIGHT,
      offset: CARD_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <View className="flex-row items-center">
        {profileImageUri ? (
          <Animated.Image
            source={{ uri: profileImageUri }}
            className="ml-7 h-28 w-28 rounded-full border-2 border-[#1877F2]"
            style={{ opacity: imageOpacity, transform: [{ translateY: imageTranslateY }] }}
          />
        ) : (
          <Image
            source={icons.profile}
            style={{
              marginLeft: 28,
              height: 96,
              width: 96,
              borderRadius: 48,
              borderWidth: 2,
              borderColor: '#1877F2',
            }}
          />
        )}
        <Animated.View
          className="ml-10 flex-1"
          style={{ opacity: textOpacity, transform: [{ translateY: textTranslateY }] }}>
          <Text className="text-left text-4xl font-extrabold text-black">Hello</Text>
          <Text className="mt-1 text-left text-5xl font-extrabold text-[#1877F2]">
            {firstName ? `${firstName}..!` : 'User..!'}
          </Text>
        </Animated.View>
      </View>
      <Animated.FlatList
        className="mt-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default HomeScreen;
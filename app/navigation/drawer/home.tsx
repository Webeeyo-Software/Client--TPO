import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Animated, Dimensions, FlatList } from 'react-native';
import MenuCard from '../../../components/home/MenuCard';
import { useRouter } from 'expo-router';

const icons = {
  companies: require('../../../assets/images/companies.png'),
  applications: require('../../../assets/images/applications.png'),
  profile: require('../../../assets/images/profile.png'),
  notices: require('../../../assets/images/notice.png'),
  offCampus: require('../../../assets/images/offCampus.png'),
  schedule: require('../../../assets/images/schedule.png'),
  tporeg: require('../../../assets/images/tporeg.png'),
  quesb: require('../../../assets/images/quesb.png'),
};
const DATA = [
  { title: 'Companies', description: 'Explore companies and opportunities', icon: icons.companies },
  { title: 'Applications', description: 'Manage your applications', icon: icons.applications },
  { title: 'Profile', description: 'View and update your profile', icon: icons.profile },
  { title: 'Notices', description: 'Stay updated with important notices', icon: icons.notices },
  { title: 'Off Campus', description: 'Explore off-campus opportunities', icon: icons.offCampus },
  {
    title: 'Scheduled Companies',
    description: 'View scheduled company visits',
    icon: icons.schedule,
  },
  {
    title: 'TPO Registration',
    description: 'Register for Training and Placement',
    icon: icons.tporeg,
  },
  { title: 'Question bank', description: 'Access previous year Questions', icon: icons.quesb },
];
const ROUTE_MAP: Record<string, string> = {
  Companies: 'screens/companies',
  Applications: 'screens/applications',
  Profile: 'screens/profile',
  Notices: 'screens/notices',
  'Off Campus': 'screens/offCampus',
  'Scheduled Companies': 'screens/scheduledCompanies',
  'TPO Registration': 'screens/tpoRegistration',
  'Question bank': '/screens/questionsBank',
};
const CARD_HEIGHT = 100;

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const imageOpacity = useMemo(() => new Animated.Value(0), []);
  const imageTranslateY = useMemo(() => new Animated.Value(20), []);
  const textOpacity = useMemo(() => new Animated.Value(0), []);
  const textTranslateY = useMemo(() => new Animated.Value(20), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(imageTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
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

const handleCardPress = useCallback((title: string) => {
  const path = ROUTE_MAP[title];
  if (path) router.push(path);
  else console.warn(`No route defined for ${title}`);
}, [router]);

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <View className="flex-row items-center">
        <Animated.Image
          source={require('../../../assets/images/abhi.jpg')}
          className="ml-7 h-24 w-24 rounded-full border-2 border-[#1877F2]"
          style={{
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslateY }],
          }}
        />
        <Animated.View
          className="ml-10 flex-1"
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}>
          <Text className="text-left text-4xl font-extrabold text-black">Hello</Text>
          <Text className="mt-1 text-left text-5xl font-extrabold text-[#1877F2]">Abhishek..!</Text>
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
        renderItem={({ item, index }) => (
          <MenuCard
            title={item.title}
            description={item.description}
            icon={item.icon}
            scrollY={scrollY}
            index={index}
            cardHeight={CARD_HEIGHT}
            onPress={() => handleCardPress(item.title)}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default HomeScreen;

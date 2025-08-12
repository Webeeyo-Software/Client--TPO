import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import MenuCard from '../../../components/home/MenuCard';
import { useRouter } from 'expo-router';
import Divider from 'components/ui/Divider';

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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DATA = [
  { title: 'Companies', description: 'Explore companies and opportunities', icon: icons.companies },
  { title: 'Applications', description: 'Manage your applications', icon: icons.applications },
  { title: 'Profile', description: 'View and update your profile', icon: icons.profile },
  { title: 'Notices', description: 'Stay updated with important notices', icon: icons.notices },
  { title: 'Off Campus', description: 'Explore off-campus opportunities', icon: icons.offCampus },
  { title: 'Scheduled Companies', description: 'View scheduled company visits', icon: icons.schedule },
  { title: 'TPO Registration', description: 'Register for Training and Placement', icon: icons.tporeg },
  { title: 'Question bank', description: 'Access previous year Questions', icon: icons.quesb },
];

// Map your titles to your route paths
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

const CARD_HEIGHT = 100; // Approximate height of each MenuCard including margin

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // Animation refs for image and text
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

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

  return (
    <View className=" flex-1 bg-white px-4 pt-12">
      <View className="flex-row items-center">
        <Animated.Image
          source={require('../../../assets/images/abhi.jpg')}
          className="h-24 w-24 ml-7 rounded-full border-2 border-[#1877F2]"
          style={{
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslateY }],
          }}
        />
        <Animated.View
          className="flex-1 ml-10"
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}
        >
          <Text className="text-left text-4xl font-extrabold text-black">Hello</Text>
          <Text className="mt-1 text-left text-5xl font-extrabold text-[#1877F2]">
            Abhishek..!
          </Text>
        </Animated.View>
      </View>
      <Animated.ScrollView
        className="mt-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {DATA.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            scrollY={scrollY}
            index={index}
            cardHeight={CARD_HEIGHT}
            onPress={() => {
              const path = ROUTE_MAP[item.title];
              if (path) {
                router.push(path);
              } else {
                console.warn(`No route defined for ${item.title}`);
              }
            }}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;

import { useRef } from 'react';
import { View, Animated } from 'react-native';
import { CompanyCard } from '../../../components/applications/Drives/CompanyCard';
import Header from 'components/ui/Header';
import { useRouter } from 'expo-router';

export default function DrivesScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
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
      <Header title="Applied Companies" mode="normal" />

      <Animated.FlatList
        data={companies}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            const scale = scrollY.interpolate({
              inputRange: [0, 150],
              outputRange: [1, 1.1], 
              extrapolate: 'clamp',
            });

            const opacity = scrollY.interpolate({
              inputRange: [0, 150],
              outputRange: [1, 0], 
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={{
                  transform: [{ scale }],
                  opacity,
                  marginBottom: 6,
                }}
              >
                <CompanyCard
                  logo={item.logo}
                  name={item.name}
                  type={item.type}
                  onPress={() => router.push('screens/applications/appliedCompanyOptions')}
                />
              </Animated.View>
            );
          }

          return (
            <View style={{ marginBottom: 6 }}>
              <CompanyCard
                logo={item.logo}
                name={item.name}
                type={item.type}
                onPress={() => router.push('screens/applications/appliedCompanyOptions')}
              />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 16,
          marginTop: 13,
          paddingVertical: 10,
        }}
      />
    </View>
  );
}
